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

            List<ContentDocumentLink> contDocLinkList = new List<ContentDocumentLink>();
            for (String photoId : photosIds) {
                contDocLinkList.add(new ContentDocumentLink(LinkedEntityId = productId, ContentDocumentId = photoId,
                        ShareType = 'I', Visibility = 'AllUsers'));
            }
            Set<String> ids = new Set<String>();
            for (ContentDocumentLink cd : contDocLinkList) {
                ids.add(cd.ContentDocumentId);
            }
            insert contDocLinkList;
            List<ContentVersion> cvs = [SELECT Id FROM ContentVersion WHERE ContentDocumentId IN :ids];
            List<ContentDistribution> cds = new List<ContentDistribution>();
            for (ContentVersion cv : cvs) {
                ContentDistribution cd = new ContentDistribution();
                cd.Name = 'myContentVersion';
                cd.ContentVersionId = cv.id;
                cd.PreferencesAllowViewInBrowser = true;
                cd.PreferencesLinkLatestVersion = true;
                cd.PreferencesNotifyOnVisit = false;
                cd.PreferencesPasswordRequired = false;
                cd.PreferencesAllowOriginalDownload = true;
                cds.add(cd);
            }
            insert cds;
            ContentDistribution contentDistributionRetrieved = [
                    SELECT
                            ContentDownloadUrl, ContentVersionId
                    FROM ContentDistribution
                    WHERE ContentVersionId = :cvs.get(0).Id
                    LIMIT 1
            ];
            prod.DisplayUrl = contentDistributionRetrieved.ContentDownloadUrl;
            update prod;

            return productId;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<String> loadPhotos(String id) {
        try {
            List<ContentDocumentLink> cdl = [
                    SELECT ContentDocumentId, LinkedEntityId
                    FROM ContentDocumentLink
                    WHERE LinkedEntityId = :id
            ];
            Set<String> ids = new Set<String>();
            for (ContentDocumentLink cd : cdl) {
                ids.add(cd.ContentDocumentId);
            }
            List<ContentVersion> cvs = [
                    SELECT Id
                    FROM ContentVersion
                    WHERE ContentDocumentId IN :ids
            ];
            Set<String> cvIds = new Set<String>();
            for (ContentVersion cv : cvs) {
                cvIds.add(cv.Id);
            }
            List<ContentDistribution> cddd = [
                    SELECT ContentVersionId,
                            ContentDownloadUrl
                    FROM ContentDistribution
                    WHERE ContentVersionId IN :cvIds
            ];
            List<String> photos = new List<String>();
            for (ContentDistribution c : cddd) {
                photos.add(c.ContentDownloadUrl);
            }
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