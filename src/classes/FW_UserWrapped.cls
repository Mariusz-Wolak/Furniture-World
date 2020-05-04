public with sharing class FW_UserWrapped {

    public FW_UserWrapped(){}

    public FW_UserWrapped(String id, String name, String street, String city, String state, String postalCode, String country){
        this.id = id;
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
    }

    @AuraEnabled
    public String id;
    @AuraEnabled
    public String name;
    @AuraEnabled
    public String street;
    @AuraEnabled
    public String city;
    @AuraEnabled
    public String state;
    @AuraEnabled
    public String postalCode;
    @AuraEnabled
    public String country;
}