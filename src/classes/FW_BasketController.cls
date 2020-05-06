public with sharing class FW_BasketController {

    @AuraEnabled
    public static List<FW_ProductWrapped> getProductsFromBasket() {
        return FW_BasketHelper.getProductsFromBasket();
    }

    @AuraEnabled
    public static FW_UserWrapped getUserInfo() {
        return FW_UserHelper.getUserInfo();
    }
}