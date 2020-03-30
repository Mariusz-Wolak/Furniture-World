public with sharing class FW_OrderController {

    public static void insertOrder(User currentUser, Object[] productsInBasket, Decimal totalPrice){
        Order newOrder = new Order();
        newOrder.BillingStreet = currentUser.street;
        newOrder.BillingCity = currentUser.city;
        newOrder.BillingState = currentUser.state;
        newOrder.BillingCountry = currentUser.country;
        newOrder.Status = 'Draft';
        newOrder.EndDate = Date.today().addDays(14);
        newOrder.EffectiveDate = Date.today();
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