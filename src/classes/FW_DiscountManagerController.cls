public with sharing class FW_DiscountManagerController {

    @AuraEnabled
    public static Object insertPricebook(String name, Date startDate, Date endDate) {
        return FW_DiscountManagerHelper.insertPricebook(name, startDate, endDate);
    }

    @AuraEnabled
    public static List<Pricebook2> getPricebooksList() {
        return FW_DiscountManagerHelper.getPricebooksList();
    }

    @AuraEnabled
    public static void insertDiscount(Map<String, Decimal> discountPriceMapped, String pricebookId) {
        FW_DiscountManagerHelper.insertDiscount(discountPriceMapped, pricebookId);
    }

    @AuraEnabled
    public static List<FW_ProductWrapped> getProductsFromPricebook(String pricebookId) {
        return FW_DiscountManagerHelper.getProductsFromPricebook(pricebookId);
    }

    @AuraEnabled
    public static Boolean removePricebook(String pricebookId) {
        return FW_DiscountManagerHelper.removePricebook(pricebookId);
    }

    @AuraEnabled
    public static Pricebook2 updatePricebook(Pricebook2 pricebook) {
        return FW_DiscountManagerHelper.updatePricebook(pricebook);
    }

    @AuraEnabled
    public static void deleteProductFromPricebook(String productId, String pricebookId) {
        FW_DiscountManagerHelper.deleteProductFromPricebook(productId, pricebookId);
    }

    @AuraEnabled
    public static void removeProductsFromPricebook(Pricebook2 pricebook, List<Object> products) {
        FW_DiscountManagerHelper.removeProductsFromPricebook(pricebook, products);
    }
}