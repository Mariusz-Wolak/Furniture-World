public with sharing class FW_ProductsDiscountManagerController {
    public static Object insertPricebook(String name, Date startDate, Date endDate) {
        if (startDate > endDate) {
            throw new AuraHandledException(Label.Start_Date_Cant_Be_Earlier_Than_End_Date + '.');
        }
        try {
            Pricebook2 newPricebook = new Pricebook2();
            newPricebook.Name = name;
            newPricebook.StartDate__c = startDate;
            newPricebook.EndDate__c = endDate;

            if ((System.today() >= startDate && System.today() <= endDate) || startDate >= System.today()) {
                newPricebook.IsActive = true;
            } else {
                newPricebook.IsActive = false;
            }

            insert newPricebook;
            return newPricebook;
        } catch (Exception e) {
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
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static void insertDiscount(Map<String, Decimal> standardPriceMapped, Map<String, Decimal> discountPriceMapped,
            String standardPricebookId, String pricebookId) {
        try {
            List<Pricebook2> standardPricebook = [SELECT Id FROM Pricebook2 WHERE Name = 'Standard Price Book'];
            List<PricebookEntry> standardEntries = [
                    SELECT Product2Id, Pricebook2Id, UnitPrice
                    FROM PricebookEntry
                    WHERE Product2Id IN :
                            standardPriceMapped.keySet() AND Pricebook2Id = :standardPricebook[0].Id
            ];

            Map<String, Decimal> newProductsMapped = standardPriceMapped.clone();
            for(String productId: standardPriceMapped.keySet()){
                for(PricebookEntry pbe: standardEntries){
                    if(productId == pbe.Product2Id){
                        newProductsMapped.remove(productId);
                        break;
                    }
                }
            }

            List<PricebookEntry> pricebookEntries = new List<PricebookEntry>();

            for (String productId : newProductsMapped.keySet()) {
                PricebookEntry newPricebookEntry = new PricebookEntry();
                newPricebookEntry.Pricebook2Id = standardPricebook[0].Id;
                newPricebookEntry.Product2Id = productId;
                newPricebookEntry.UnitPrice = newProductsMapped.get(productId);
                newPricebookEntry.UseStandardPrice = false;
                newPricebookEntry.isActive = true;
                pricebookEntries.add(newPricebookEntry);
            }

            for (String productId : discountPriceMapped.keySet()) {
                if(newProductsMapped.containsKey(productId)){
                    continue;
                }
                PricebookEntry newPricebookEntry = new PricebookEntry();
                newPricebookEntry.Pricebook2Id = pricebookId;
                newPricebookEntry.Product2Id = productId;
                newPricebookEntry.UnitPrice = discountPriceMapped.get(productId);
                newPricebookEntry.UseStandardPrice = false;
                newPricebookEntry.isActive = true;
                pricebookEntries.add(newPricebookEntry);
            }
            upsert pricebookEntries;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}