public with sharing class FW_OrderController {

    public static void insertOrder(User currentUser, Object[] productsInBasket, Decimal totalPrice){
        System.debug(productsInBasket);
        String productsString = JSON.serialize(productsInBasket);
        List<FW_ProductWrapped> wrappedProducts = (List<FW_ProductWrapped>) JSON.deserialize(productsString,
                List<FW_ProductWrapped>.class);
        System.debug(wrappedProducts);
//
        for(FW_ProductWrapped prod: wrappedProducts){
            System.debug('prod: '+prod);
            System.debug('desc: '+prod.description);
            System.debug('desc: '+prod.id);
            System.debug('prod.price: '+prod.price);
            System.debug('prod.quantity: '+prod.quantity);
        }
//        try {
//            String orderId;
//            Order newOrder = new Order();
//            newOrder.BillingStreet = currentUser.street;
//            newOrder.BillingCity = currentUser.city;
//            newOrder.BillingState = currentUser.state;
//            newOrder.BillingCountry = currentUser.country;
//            newOrder.Status = 'Draft';
//            newOrder.EndDate = Date.today().addDays(14);
//            newOrder.EffectiveDate = Date.today();
//            newOrder.Price__c = totalPrice;
//
//            Database.SaveResult saveResult = Database.insert(newOrder);
//            if (saveResult.isSuccess()) {
//                orderId = saveResult.Id;
//            }
//
//            List<OrderItem> itemsToOrder = new List<OrderItem>();
//            for(Object prod: productsInBasket){
//                OrderItem item = new OrderItem(OrderId = orderId);
//                item.UnitPrice = prod.price;
//                item.Quantity = prod.quantity;
//                item.Product2Id = prod.id;
//                itemsToOrder.add(item);
//            }
//
//
//        }catch(Exception e){
//            throw new AuraHandledException(e.getMessage());
//        }
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
}