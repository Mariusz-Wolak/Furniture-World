public with sharing class FW_DivisionsSearchController {

    private static String getQuery(String name, String city, String country) {
        if (String.isNotBlank(name)) {
            String query = 'SELECT Id, Name, ShippingCountry, ShippingCity, ShippingStreet, ShippingPostalCode, Website FROM ' +
                    'Account ' +
                    'WHERE Name LIKE \'%' + name + '%\'';
            query += String.isBlank(country) ? '' : ' AND ShippingCountry LIKE \'%' + country + '%\'';
            query += String.isBlank(city) ? '' : ' AND ShippingCity LIKE \'%' + city + '%\'';
            return query;
        }else{
            FW_CustomExceptionData data = new FW_CustomExceptionData('Error', 'Value cannot be blank.');
            throw new AuraHandledException(JSON.serialize(data));
        }
    }

    @AuraEnabled
    public static List<Account> getSearchResults(String name, String city, String country) {
        try {
            return Database.query(getQuery(name, city, country));
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean deleteDivision(String id) {
        try {
            Database.DeleteResult result = Database.delete(id);
            return result.isSuccess();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}