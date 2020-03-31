public with sharing class FW_ProductManagementController {

    public static String myDomainURL = 'https://furnitureworld-dev-ed.lightning.force.com/sfc/servlet' +
            '.shepherd/document/download/';

    @AuraEnabled
    public static List<String> getFamilyOptions() {
        try{
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
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    public List<PhotoForItem__c> getPhotos(List<String> files, String productId){
        try {

            List<PhotoForItem__c> photos = new List<PhotoForItem__c>();
            for (String file : files) {
                PhotoForItem__c photo = new PhotoForItem__c();
                photo.imgURL__c = myDomainURL + file;
                photo.Product__c = productId;
                photos.add(photo);
            }
            Database.upsert(photos);
            return photos;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Id addProduct(String name, String description, String family, List<String> photosIds){
        try {
            Product2 prod = new Product2();
            prod.Name = name;
            prod.Description = description;
            prod.Family = family;
            prod.Type__c = 'Furniture';
            prod.IsActive = true;
            if (photosIds.size() > 0) {
                System.debug('photosIds size >0 v2');
                prod.DisplayUrl = myDomainURL + photosIds.get(0);
                prod.DisplayUrl2__c = myDomainURL + photosIds.get(1);
                System.debug('po dwoch fotach');
            }
            Database.SaveResult sr = Database.insert(prod);
            String productId = sr.getId();
            List<PhotoForItem__c> photos = new List<PhotoForItem__c>();
            for (String ph : photosIds) {
                PhotoForItem__c photo = new PhotoForItem__c();
                photo.Product__c = productId;
                photo.imgURL__c = ph;
                photos.add(photo);
            }
            Database.insert(photos);
            System.debug('productId in AddItem: '+productId);
            return productId;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<PhotoForItem__c> loadPhotos(String id) {
        try {
            List<PhotoForItem__c> photos = [SELECT Id, Product__c, imgURL__c FROM PhotoForItem__c WHERE Product__c = :id];
            return photos;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void setMainPhoto(String url, String productId) {
        try {
            List<Product2> products = [SELECT Id, DisplayUrl2__c FROM Product2 WHERE Id = :productId];
            products[0].DisplayUrl2__c = url;
            Database.SaveResult result = Database.update(products[0]);
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static String getMainPhoto(String productId){
        try {
            List<Product2> products = [SELECT Id, DisplayUrl2__c FROM Product2 WHERE Id = :productId];
            return products[0].DisplayUrl2__c;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}