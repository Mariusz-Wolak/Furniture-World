public with sharing class FW_ProductsController {
    private static String getQuery(String name) {
        if (String.isNotBlank(name)) {
            String query = 'SELECT Id, DisplayUrl, Description, Name FROM Product2 ' +
                            'WHERE Name LIKE \'%' + name + '%\'';
            return query;
        }
        return '';
    }

    @AuraEnabled
    public static List<Product2> getSearchResults(String name){
        try {
            return Database.query(getQuery(name));
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}