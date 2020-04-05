public with sharing class FW_ProductsDiscountManagerController {
    public static Object insertPricebook(String name, Date startDate, Date endDate){
        if(startDate > endDate){
            throw new AuraHandledException(Label.Start_Date_Cant_Be_Earlier_Than_End_Date +'.');
        }
        try {
            Pricebook2 newPricebook = new Pricebook2();
            newPricebook.Name = name;
            newPricebook.StartDate__c = startDate;
            newPricebook.EndDate__c = endDate;

            if ((System.today() >= startDate && System.today() <= endDate) || startDate >= System.today()) {
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

    public static List<Pricebook2> getPricebooksList() {
        try {
            List<Pricebook2> pricebooks = [
                    SELECT Id, Name, StartDate__c, EndDate__c, isActive
                    FROM Pricebook2
                    WHERE isActive = true
                    OR StartDate__c >= TODAY
            ];
            return pricebooks;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static void insertDiscount(Map<String, Decimal> productsMapped, String pricebookId){
        try{
            List<PricebookEntry> pricebookEntries = new List<PricebookEntry>();
            for(String productId: productsMapped.keySet()) {
                PricebookEntry newPricebookEntry = new PricebookEntry();
                newPricebookEntry.Pricebook2Id = pricebookId;
                newPricebookEntry.Product2Id = productId;
                newPricebookEntry.UnitPrice = productsMapped.get(productId);
                newPricebookEntry.UseStandardPrice = false;
                newPricebookEntry.isActive = true;
                pricebookEntries.add(newPricebookEntry);

                insert pricebookEntries;
            }
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}