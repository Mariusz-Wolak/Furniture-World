public with sharing class FW_OrderHelper {

    public static void insertOrder(Object currentUser, List<Object> productsInBasket, Decimal totalPrice) {
        String productsString = JSON.serialize(productsInBasket);
        List<FW_ProductWrapped> wrappedProducts = (List<FW_ProductWrapped>) JSON.deserialize(productsString,
                List<FW_ProductWrapped>.class);
        String userString = JSON.serialize(currentUser);
        User currUser = (User) JSON.deserialize(userString, User.class);
        Order__c orderFromCustomSettings = Order__c.getInstance('FW_Order');

        List<Pricebook2> standardPB = [SELECT Id, Name FROM Pricebook2 WHERE Name = 'Standard Price Book'];
        List<PricebookEntry> standardPBEList = [SELECT Id, Product2Id, Pricebook2Id FROM PricebookEntry WHERE Pricebook2.Name = 'Standard Price Book'];
        try {
            String orderId;
            Order newOrder = new Order();
            newOrder.AccountId = orderFromCustomSettings.accountId__c;
            newOrder.ContractId = orderFromCustomSettings.contractId__c;
            newOrder.Pricebook2Id = standardPB[0].Id;
            newOrder.BillingStreet = currUser.street;
            newOrder.BillingCity = currUser.city;
            newOrder.BillingState = currUser.state;
            newOrder.BillingCountry = currUser.country;
            newOrder.BillingPostalCode = currUser.postalCode;
            newOrder.Buyer__c = currUser.name;
            newOrder.Status = 'Draft';
            newOrder.EndDate = Date.today().addDays(14);
            newOrder.EffectiveDate = Date.today();
            newOrder.Price__c = totalPrice;

            Database.SaveResult saveResult = Database.insert(newOrder);
            if (saveResult.isSuccess()) {
                orderId = saveResult.Id;
            }

            List<OrderItem> itemsToOrder = new List<OrderItem>();
            for (FW_ProductWrapped prod : wrappedProducts) {
                OrderItem item = new OrderItem(OrderId = orderId);
                if(prod.discountPrice != null){
                    item.UnitPrice = prod.discountPrice;
                }else{
                    item.UnitPrice = prod.price;
                }
                item.Quantity = prod.quantity;
                item.Product2Id = prod.id;
                item.DisplayUrl__c = prod.displayUrl;

                for (PricebookEntry pbe : standardPBEList) {
                    if(pbe.Product2Id == prod.id) {
                        item.PricebookEntryId = pbe.Id;
                        break;
                    }
                }
                itemsToOrder.add(item);
            }

            insert itemsToOrder;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static List<Order> getOrders() {
        List<Order> orders = [
                SELECT Id, Buyer__c, CreatedById, CreatedDate, BillingCountry, BillingState, BillingPostalCode, BillingCity, Price__c,
                        BillingStreet, Status, TotalAmount, EffectiveDate, OrderNumber, (
                        SELECT Id,
                                OrderId,
                                OrderItemNumber,
                                PricebookEntry.Product2.Name,
                                PricebookEntry.Product2.id,
                                DisplayUrl__c,
                                TotalPrice,
                                Quantity,
                                UnitPrice
                        FROM OrderItems
                )
                FROM Order
                WHERE CreatedById = :UserInfo.getUserId()
                ORDER BY CreatedDate DESC
        ];

        return orders;
    }
}