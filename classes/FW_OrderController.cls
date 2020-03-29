public with sharing class FW_OrderController {

    public static Object getUserInfo() {
        try {
            List<User> users = [SELECT Id, Name, Address FROM User WHERE
                    Id = :UserInfo.getUserId()];
            return users[0];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static void insertOrder(Object account, Object[] productsInBasket, Decimal totalPrice){
        Order newOrder = new Order();
        System.debug('account: '+account);
//        System.debug('account.name: '+account[0].Name);
//        System.debug('account.address.street: '+account.Address.street);
//        newOrder.BillingStreet = account.address.street;
//        newOrder.BillingCity = account.Address.city;
//        newOrder.BillingPostalCode = account.Address.postalCode;
//        newOrder.BillingState = account.Address.state;
//        newOrder.BillingCountry = account.Address.country;
//        newOrder.Status = 'Draft';
//        newOrder.EndDate = Date.today().addDays(14);
//        newOrder.EffectiveDate = Date.today();
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