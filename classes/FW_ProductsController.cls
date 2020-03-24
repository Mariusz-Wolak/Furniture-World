public with sharing class FW_ProductsController {
    private static String getQuery(String name) {
        if (String.isNotBlank(name)) {
            String query = 'SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c FROM Product2 ' +
                    'WHERE Name LIKE \'%' + name + '%\' AND Type__c = \'Furniture\' ORDER BY Price__c ASC';
            return query;
        } else {
            throw new FW_CustomException.OtherException((Label.Fill_Blank_Value_Error));
        }
    }

    @AuraEnabled
    public static List<Product2> getSearchResults(String name) {
        try {
            return Database.query(getQuery(name));
        } catch (FW_CustomException e) {
            FW_CustomExceptionData customException = new FW_CustomExceptionData(e.getMessage());
            throw new AuraHandledException(JSON.serialize(customException));
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Product2> getNewestProducts() {
        String query = 'SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c, CreatedDate FROM Product2 WHERE Type__c = ' +
                '\'Furniture\' ORDER BY CreatedDate DESC LIMIT 12';

        try {
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void insertToObserved(String productId) {
        try {
            FW_ObservedItem__c observedItem = new FW_ObservedItem__c();
            observedItem.Name = productId;
            insert observedItem;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean checkIfProductIsObserved(String productId) {
        try {
            List<FW_ObservedItem__c> observedItems = [SELECT Name FROM FW_ObservedItem__c WHERE Name = :productId];
            if (observedItems.size() > 0) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public List<Product2> getObservedProducts() {
        try {
            List<FW_ObservedItem__c> observedItems = [SELECT Name FROM FW_ObservedItem__c];
            Set<Id> observedProductsIds = new Set<Id>();

            if(observedItems.size()>0){
                for(FW_ObservedItem__c item: observedItems){
                    observedProductsIds.add(item.Name);
                }

                List<Product2> productsToReturn = [SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c
                FROM Product2
                WHERE Id IN :observedProductsIds];

                return productsToReturn;
            }else{
                return null;
            }
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}