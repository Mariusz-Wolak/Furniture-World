public with sharing class FW_ProductManagementController {

    public static FW_URL__c productImgStartURL = FW_URL__c.getInstance('FW_ProductImg');
    public static String startURL = productImgStartURL.URL__c;

    @AuraEnabled
    public static List<String> getFamilyOptions() {
        try {
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
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Id addProduct(String name, String description, String family, List<String> photosIds) {
        try {
            Product2 prod = new Product2();
            prod.Name = name;
            prod.Description = description;
            prod.Family = family;
            prod.Type__c = 'Furniture';
            prod.IsActive = true;
            if (photosIds.size() > 0) {
                prod.DisplayUrl = startURL + photosIds.get(0);
            }
            Database.SaveResult sr = Database.insert(prod);
            String productId = sr.getId();
            List<PhotoForItem__c> photos = new List<PhotoForItem__c>();
            for (String ph : photosIds) {
                PhotoForItem__c photo = new PhotoForItem__c();
                photo.Product__c = productId;
                photo.imgURL__c = startURL + ph;
                photos.add(photo);
            }
            Database.insert(photos);
            return productId;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<PhotoForItem__c> loadPhotos(String id) {
        try {
            List<PhotoForItem__c> photos = [SELECT Id, Product__c, imgURL__c FROM PhotoForItem__c WHERE Product__c = :id];
            return photos;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void setMainPhoto(String url, String productId) {
        try {
            List<Product2> products = [SELECT Id, DisplayUrl FROM Product2 WHERE Id = :productId];
            products[0].DisplayUrl = url;
            Database.SaveResult result = Database.update(products[0]);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String getMainPhoto(String productId) {
        try {
            List<Product2> products = [SELECT Id, DisplayUrl FROM Product2 WHERE Id = :productId];
            return products[0].DisplayUrl;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String getListViewId() {
        try {
            List<ListView> ids = [SELECT Id, DeveloperName FROM ListView WHERE DeveloperName = 'FurnitureWorldProducts'];
            return ids[0].Id;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}