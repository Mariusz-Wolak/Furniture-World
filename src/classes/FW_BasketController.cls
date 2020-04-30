public with sharing class FW_BasketController {

    @AuraEnabled
    public static List<FW_ProductWrapped> getProductsFromBasket() {
        return FW_BasketHelper.getProductsFromBasket();
    }

    public static List<FW_ProductWrapped> removeFromBasket(String productId) {
        try {
            Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.SOAPCredentials');
            Map<String, Integer> productsCachedMap = (Map<String, Integer>) sessionPartition.get('productsCachedMap');
            if (productsCachedMap != null) {
                sessionPartition.remove('productsCachedMap');
                productsCachedMap.remove(productId);
                sessionPartition.put('productsCachedMap', productsCachedMap);
            }

            return getProductsFromBasket();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static FW_UserWrapped getUserInfo() {
        return FW_UserHelper.getUserInfo();
    }
}