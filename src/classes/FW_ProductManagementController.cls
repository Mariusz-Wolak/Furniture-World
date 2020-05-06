public with sharing class FW_ProductManagementController {

    @AuraEnabled
    public static List<String> getFamilyOptions() {
        return FW_ProductManagementHelper.getFamilyOptions();
    }

    @AuraEnabled
    public static Id addProduct(String name, String description, String family, List<String> photosIds) {
        return FW_ProductManagementHelper.addProduct(name, description, family, photosIds);
    }

    @AuraEnabled
    public static List<String> loadPhotos(String id) {
        return FW_ProductManagementHelper.loadPhotos(id);
    }

    @AuraEnabled
    public static void setMainPhoto(String url, String productId) {
        FW_ProductManagementHelper.setMainPhoto(url, productId);
    }

    @AuraEnabled
    public static String getMainPhoto(String productId) {
        return FW_ProductManagementHelper.getMainPhoto(productId);
    }

    @AuraEnabled
    public static String getListViewId() {
        return FW_ProductManagementHelper.getListViewId();
    }
}