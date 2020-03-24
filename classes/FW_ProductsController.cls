public with sharing class FW_ProductsController {
    private static String getQuery(String name) {
        if (String.isNotBlank(name)) {
            String query = 'SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c FROM Product2 ' +
                            'WHERE Name LIKE \'%' + name + '%\' AND Type__c = \'Furniture\' ORDER BY Price__c ASC';
            return query;
        }else{
            throw new FW_CustomException.OtherException((Label.Fill_Blank_Value_Error));
        }
    }

    @AuraEnabled
    public static List<Product2> getSearchResults(String name){
        try {
            return Database.query(getQuery(name));
        } catch (FW_CustomException e) {
            FW_CustomExceptionData customException = new FW_CustomExceptionData(e.getMessage());
            throw new AuraHandledException(JSON.serialize(customException));
        }catch (Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Product2> returnAllProducts(){
        String query = 'SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c FROM Product2 WHERE Type__c = ' +
                '\'Furniture\' ORDER BY Price__c ASC';

        try {
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}