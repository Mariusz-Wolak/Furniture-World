public with sharing class FW_ProductsController {

    @AuraEnabled
    public static List<Object> getSearchResults(String name) {
        return FW_ProductsHelper.getSearchResults(name);
    }

    @AuraEnabled
    public static FW_ProductWrapped getProductInfo(String productId) {
        return FW_ProductsHelper.getProductInfo(productId);
    }

    @AuraEnabled
    public static List<Object> getNewestProducts() {
        return FW_ProductsHelper.getNewestProducts();
    }

    @AuraEnabled
    public static void insertToObserved(String productId) {
        FW_ProductsHelper.insertToObserved(productId);
    }

    @AuraEnabled
    public static Boolean removeFromObserved(String productId) {
        return FW_ProductsHelper.removeFromObserved(productId);
    }

    @AuraEnabled
    public static Boolean checkIfProductIsObserved(String productId) {
        return FW_ProductsHelper.checkIfProductIsObserved(productId);
    }

    @AuraEnabled
    public static List<String> checkIfResultsAreObserved(String[] productsIds) {
        return FW_ProductsHelper.checkIfResultsAreObserved(productsIds);
    }

    @AuraEnabled
    public static List<Object> getObservedProducts() {
        return FW_ProductsHelper.getObservedProducts();
    }

    @AuraEnabled
    public static void insertComment(String productId, String commentText, string rate) {
        FW_ProductsHelper.insertComment(productId, commentText, rate);
    }

    @AuraEnabled
    public static List<FW_Rating__c> getNewestComments(String productId) {
        return FW_ProductsHelper.getNewestComments(productId);
    }

    @AuraEnabled
    public static List<Object> getSimilarProducts(String productFamily, String productId) {
        return FW_ProductsHelper.getSimilarProducts(productFamily, productId);
    }

    @AuraEnabled
    public static List<FW_ProductWrapped> insertToBasket(String productId, Integer quantity) {
        return FW_BasketHelper.insertToBasket(productId, quantity);
    }

    @AuraEnabled
    public static List<FW_ProductWrapped> removeFromBasket(String productId) {
        return FW_BasketHelper.removeFromBasket(productId);
    }

    @AuraEnabled
    public static void insertOrder(Object currentUser, List<Object> productsInBasket, Decimal totalPrice) {
        FW_OrderHelper.insertOrder(currentUser, productsInBasket, totalPrice);
    }

    @AuraEnabled
    public static void deleteBasket() {
        FW_BasketHelper.deleteBasket();
    }

    @AuraEnabled
    public static List<Order> getOrders() {
        return FW_OrderHelper.getOrders();
    }

    @AuraEnabled
    public static void insertCase(String subject, String description, String orderId, String productId) {
        FW_ComplaintsHelper.insertCase(subject, description, orderId, productId);
    }

    @AuraEnabled
    public static Object insertPricebook(String name, Date startDate, Date endDate) {
        return FW_ProductsDiscountManagerController.insertPricebook(name, startDate, endDate);
    }

    @AuraEnabled
    public static List<Pricebook2> getPricebooksList() {
        return FW_ProductsDiscountManagerController.getPricebooksList();
    }

    @AuraEnabled
    public static void insertDiscount(Map<String, Decimal> discountPriceMapped, String pricebookId) {
        FW_ProductsDiscountManagerController.insertDiscount(discountPriceMapped, pricebookId);
    }

    @AuraEnabled
    public static List<FW_ProductWrapped> getProductsFromPricebook(String pricebookId) {
        return FW_ProductsDiscountManagerController.getProductsFromPricebook(pricebookId);
    }

    @AuraEnabled
    public static Boolean removePricebook(String pricebookId) {
        return FW_ProductsDiscountManagerController.removePricebook(pricebookId);
    }

    @AuraEnabled
    public static Pricebook2 updatePricebook(Pricebook2 pricebook) {
        return FW_ProductsDiscountManagerController.updatePricebook(pricebook);
    }

    @AuraEnabled
    public static void deleteProductFromPricebook(String productId, String pricebookId) {
        FW_ProductsDiscountManagerController.deleteProductFromPricebook(productId, pricebookId);
    }

    @AuraEnabled
    public static void removeProductsFromPricebook(Pricebook2 pricebook, List<Object> products) {
        FW_ProductsDiscountManagerController.removeProductsFromPricebook(pricebook, products);
    }
}