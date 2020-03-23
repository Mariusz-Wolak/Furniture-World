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
            throw new FW_CustomException.OtherException((Label.Fill_Blank_Value_Error));
        }
    }

    @AuraEnabled
    public static List<Account> getSearchResults(String name, String city, String country) {
        try {
            return Database.query(getQuery(name, city, country));
        } catch (FW_CustomException e) {
            FW_CustomExceptionData customException = new FW_CustomExceptionData(e.getMessage());
            throw new AuraHandledException(JSON.serialize(customException));
        }
    }

    @AuraEnabled
    public static Boolean deleteSelectedDivision(String id) {
        try {
            Database.DeleteResult result = Database.delete(id);
            return result.isSuccess();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}