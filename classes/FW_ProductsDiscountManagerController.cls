public with sharing class FW_ProductsDiscountManagerController {
    public static Pricebook2 insertPricebook(String name, Date startDate, Date endDate){
        try {
            Pricebook2 newPricebook = new Pricebook2();
            newPricebook.Name = name;
            newPricebook.StartDate__c = startDate;
            newPricebook.EndDate__c = endDate;

            if (System.today() >= startDate && System.today() <= endDate) {
                newPricebook.IsActive = true;
            }else{
                newPricebook.IsActive = false;
            }

            insert newPricebook;
            return newPricebook;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}