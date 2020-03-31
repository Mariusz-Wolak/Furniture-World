public with sharing class FW_ProductManagementController {

    @AuraEnabled
    public static List<String> getFamilyOptions() {
        List<String> options = new list < String > ();
        Schema.sObjectType objType = Product2.getSObjectType();
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        Map<String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
        list<Schema.PicklistEntry> values =
                fieldMap.get('Family').getDescribe().getPickListValues();
        for (Schema.PicklistEntry a : values) {
            options.add(a.getValue());
        }
        return options;
    }

    public List<PhotoForItem__c> getPhotos(List<String> files, String productId){
        String startURL = 'https://furnitureworld-dev-ed.lightning.force.com/sfc/servlet.shepherd/document/download/';
        List<PhotoForItem__c> photos = new List<PhotoForItem__c>();
        for(String file : files){
            PhotoForItem__c photo = new PhotoForItem__c();
            photo.imgURL__c = startURL + file;
            photo.Product__c = productId;
            photos.add(photo);
        }
        Database.upsert(photos);
        return photos;
    }
    @AuraEnabled
    public static Id addProduct(String name, String description, String family, List<String> photosIds){
        String startURL = 'https://furnitureworld-dev-ed.lightning.force.com/sfc/servlet.shepherd/document/download/';
        Product2 prod = new Product2();
        prod.Name = name;
        prod.Description = description;
        prod.Family = family;
        prod.IsActive = true;
        if(photosIds.size() >0) {
            prod.DisplayUrl = startURL + photosIds.get(0);
            prod.DisplayUrl2__c = startURL + photosIds.get(1);
        }
        Database.SaveResult sr = Database.insert(prod);
        String productId = sr.getId();
        List<PhotoForItem__c> photos = new List<PhotoForItem__c>();
        for(String ph : photosIds){
            PhotoForItem__c photo = new PhotoForItem__c();
            photo.Product__c = productId;
            photo.imgURL__c = ph;
            photos.add(photo);
        }
        Database.insert(photos);
        return productId;
    }
    @AuraEnabled
    public static List<PhotoForItem__c> loadPhotos(String id) {
        List<PhotoForItem__c> photos = [SELECT Id, Product__c, imgURL__c FROM PhotoForItem__c WHERE Product__c = :id];
        return photos;
    }
    @AuraEnabled
    public static void setMainPhoto(String url, String productId) {
        List<Product2> products = [SELECT Id, DisplayUrl2__c FROM Product2 WHERE Id = :productId];
        products[0].DisplayUrl2__c = url;
        Database.SaveResult result = Database.update(products[0]);
    }
    @AuraEnabled
    public static String getMainPhoto(String productId){
        List<Product2> products = [SELECT Id, DisplayUrl2__c FROM Product2 WHERE Id = :productId];
        return products[0].DisplayUrl2__c;
    }
}