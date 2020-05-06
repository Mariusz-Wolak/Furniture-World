public with sharing class FW_ProductWrapped {

    public FW_ProductWrapped(){}

    public FW_ProductWrapped(String id, String displayUrl, String description, String name, String type, String family, List<FW_ObservedItem__c>
            observedItems){
        this.id = id;
        this.displayUrl = displayUrl;
        this.description = description;
        this.name = name;
        this.type = type;
        this.family = family;
        this.observedItems = observedItems;
    }

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
    public Decimal discountPrice;
    @AuraEnabled
    public Integer quantity;
    @AuraEnabled
    public Decimal totalPrice;
    @AuraEnabled
    public Integer totalQuantity;
    @AuraEnabled
    public String pricebookEntryId;
    @AuraEnabled
    public String pricebookId;
    @AuraEnabled
    public List<FW_ObservedItem__c> observedItems;
    @AuraEnabled
    public Boolean isObserved;

}