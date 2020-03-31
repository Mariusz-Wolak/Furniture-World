public with sharing class FW_OrderController {

    public static void insertOrder(User currentUser, Object[] productsInBasket, Decimal totalPrice){
        String productsString = JSON.serialize(productsInBasket);
        List<FW_ProductWrapped> wrappedProducts = (List<FW_ProductWrapped>) JSON.deserialize(productsString,
                List<FW_ProductWrapped>.class);
        Pricebook2 pricebook = [SELECT Id FROM Pricebook2 WHERE Name = 'Standard Price Book'];
        String userString = JSON.serialize(currentUser);
        User currUser = (User) JSON.deserialize(userString, User.class);

        try {
            String orderId;
            Order newOrder = new Order();
            newOrder.AccountId = '0015J000003ioeGQAQ';
            newOrder.Pricebook2Id = pricebook.Id;
            newOrder.BillingStreet = currUser.street;
            newOrder.BillingCity = currUser.city;
            newOrder.BillingState = currUser.state;
            newOrder.BillingCountry = currUser.country;
            newOrder.Status = 'Draft';
            newOrder.EndDate = Date.today().addDays(14);
            newOrder.EffectiveDate = Date.today();
            newOrder.Price__c = totalPrice;

            Database.SaveResult saveResult = Database.insert(newOrder);
            if (saveResult.isSuccess()) {
                orderId = saveResult.Id;
            }

            List<OrderItem> itemsToOrder = new List<OrderItem>();
            for(FW_ProductWrapped prod: wrappedProducts){
                OrderItem item = new OrderItem(OrderId = orderId);
                item.UnitPrice = prod.price;
                item.Quantity = prod.quantity;
                item.Product2Id = prod.id;
                item.PricebookEntryId = prod.pricebookEntryId;
                itemsToOrder.add(item);
            }

            insert itemsToOrder;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static void deleteBasket(){
        try {
            Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.SOAPCredentials');
            Map<String, Integer> productsCachedMap = (Map<String, Integer>) sessionPartition.get('productsCachedMap');
            if (productsCachedMap != null) {
                sessionPartition.remove('productsCachedMap');
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static List<Order> getOrders(){
        List<Order> orders = [
                SELECT Id, CreatedById, CreatedDate, BillingCountry, BillingState, BillingPostalCode, BillingCity, Price__c,
                        BillingStreet,
                        Status, TotalAmount, EffectiveDate, (
                        SELECT  Id,
                                OrderId,
                                OrderItemNumber,
                                PricebookEntry.Product2.Name,
                                PricebookEntry.Product2.id,
                                Quantity,
                                UnitPrice
                        FROM OrderItems
                )
                FROM Order
                WHERE CreatedById =: UserInfo.getUserId()
                ORDER BY CreatedDate DESC
        ];
        return orders;
    }

    public static void insertCase(String subject, String description, String orderId, String productId){
        Case newCase = new Case();
        newCase.Subject = subject;
        newCase.Description = description;
        newCase.Order__c = orderId;
        newCase.ProductId = productId;
        try{
            insert newCase;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}