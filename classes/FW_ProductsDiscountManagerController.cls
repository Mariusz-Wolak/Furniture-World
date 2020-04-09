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
            newPricebook.IsActive = true;

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
                    ORDER BY StartDate__c
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
            for (String productId : standardPriceMapped.keySet()) {
                for (PricebookEntry pbe : standardEntries) {
                    if (productId == pbe.Product2Id) {
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
                if (newProductsMapped.containsKey(productId)) {
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

    public static List<FW_ProductWrapped> getProductsFromPricebook(String pricebookId) {
        try {
            List<PricebookEntry> pbeList = [SELECT Id, Product2Id, UnitPrice FROM PricebookEntry WHERE Pricebook2.Id = :pricebookId];
            Set<String> productsIds = new Set<String>();
            for (PricebookEntry pbe : pbeList) {
                productsIds.add(pbe.Product2Id);
            }
            List<Product2> products = [
                    SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c
                    FROM Product2
                    WHERE Type__c = 'Furniture' AND Id IN:productsIds
            ];
            List<FW_ProductWrapped> productsWrappedList = new List<FW_ProductWrapped>();

            for (Product2 prod : products) {
                FW_ProductWrapped productWrapped = new FW_ProductWrapped();
                productWrapped.id = prod.Id;
                productWrapped.displayUrl = prod.DisplayUrl;
                productWrapped.description = prod.Description;
                productWrapped.name = prod.Name;
                productWrapped.type = prod.Type__c;
                productWrapped.family = prod.Family;
                productWrapped.observedItems = prod.FW_ObservedItems__r;
                productWrapped.isObserved = !productWrapped.observedItems.isEmpty();

                for (PricebookEntry pbe : pbeList) {
                    if (prod.Id == pbe.Product2Id) {
                        productWrapped.price = pbe.UnitPrice;
                        productWrapped.pricebookEntryId = pbe.Id;
                    }
                }

                productsWrappedList.add(productWrapped);
            }
            return productsWrappedList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static Boolean removePricebook(String pricebookId) {
        try {
            Database.DeleteResult result = Database.delete(pricebookId);
            return result.isSuccess();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static Pricebook2 updatePricebook(Pricebook2 pricebook){
        if (pricebook.StartDate__c > pricebook.EndDate__c) {
            throw new AuraHandledException(Label.Start_Date_Cant_Be_Earlier_Than_End_Date + '.');
        }
        try{
            update pricebook;
            return pricebook;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}