public with sharing class FW_CartController {



    @AuraEnabled
    public static Object getBasket() {
        try {
            Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.SOAPCredentials');
            Object product = sessionPartition.get('CartItem');
            return product;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}