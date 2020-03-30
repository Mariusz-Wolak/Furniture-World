public with sharing class FW_ProductWrapped {
    @AuraEnabled
    public String id;
    @AuraEnabled
    public String displayUrl;
    @AuraEnabled
    public String description;
    @AuraEnabled
    public String name;
    @AuraEnabled
    public String type;
    @AuraEnabled
    public String family;
    @AuraEnabled
    public Decimal price;
    @AuraEnabled
    public Integer quantity;
    @AuraEnabled
    public Decimal totalPrice;
    @AuraEnabled
    public Integer totalQuantity;
    @AuraEnabled
    public String pricebookEntryId;
}