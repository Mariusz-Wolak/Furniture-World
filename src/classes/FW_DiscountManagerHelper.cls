public with sharing class FW_DiscountManagerHelper {

    public static Object insertPricebook(String name, Date startDate, Date endDate) {
        if (String.isBlank(name) || startDate == null || endDate == null) {
            throw new AuraHandledException(Label.Please_Fill_In_Given_Inputs);
        }
        if (startDate > endDate) {
            throw new AuraHandledException(Label.Start_Date_Cant_Be_Earlier_Than_End_Date);
        }
        List<Pricebook2> pricebooks = [Select Id, Name FROM Pricebook2];
        for (Pricebook2 pb : pricebooks) {
            if (pb.Name == name) {
                throw new AuraHandledException(Label.This_Name_Is_Already_In_Use);
            }
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
                    ORDER BY StartDate__c DESC
            ];
            for(Integer i=0; i<pricebooks.size(); i++){
                if(pricebooks[i].Name == 'Standard Price Book'){
                    Integer index = pricebooks.indexOf(pricebooks[i]);
                    pricebooks.add(0, pricebooks.remove(index));
                }
            }
            return pricebooks;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static void insertDiscount(Map<String, Decimal> discountPriceMapped, String pricebookId) {
        try {
            List<PricebookEntry> pricebookEntries = new List<PricebookEntry>();

            List<PricebookEntry> pbeList = [
                    SELECT Pricebook2Id, Product2Id, UnitPrice
                    FROM PricebookEntry
                    WHERE Pricebook2Id = :pricebookId AND
                    Product2Id IN:discountPriceMapped.keySet()
            ];

            for (String productId : discountPriceMapped.keySet()) {

                for (PricebookEntry pbe : pbeList) {
                    if (productId == pbe.Product2Id) {
                        pbe.UnitPrice = discountPriceMapped.get(productId);
                        pricebookEntries.add(pbe);
                        discountPriceMapped.remove(productId);
                    }
                }
            }

            for (String productId : discountPriceMapped.keySet()) {
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

            List<PricebookEntry> standardPB = [SELECT Id, Product2Id, UnitPrice FROM PricebookEntry WHERE Pricebook2.Name = 'Standard Price Book'];

            List<FW_ProductWrapped> productsWrappedList = new List<FW_ProductWrapped>();

            for (Product2 prod : products) {
                FW_ProductWrapped productWrapped = new FW_ProductWrapped(prod.Id, prod.DisplayUrl, prod.Description, prod.Name, prod.Type__c, prod
                        .Family, prod.FW_ObservedItems__r);

                productWrapped.isObserved = !productWrapped.observedItems.isEmpty();
                for (PricebookEntry pbe : pbeList) {
                    if (prod.Id == pbe.Product2Id) {
                        productWrapped.discountPrice = pbe.UnitPrice;
                        productWrapped.pricebookEntryId = pbe.Id;
                    }
                }

                for (PricebookEntry pbe : standardPB) {
                    if (prod.Id == pbe.Product2Id) {
                        productWrapped.price = pbe.UnitPrice;
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

    public static Pricebook2 updatePricebook(Pricebook2 pricebook) {
        if (String.isBlank(pricebook.Name) || pricebook.StartDate__c == null || pricebook.EndDate__c == null) {
            throw new AuraHandledException(Label.Please_Fill_In_Given_Inputs);
        }
        if (pricebook.StartDate__c > pricebook.EndDate__c) {
            throw new AuraHandledException(Label.Start_Date_Cant_Be_Earlier_Than_End_Date);
        }
        try {
            update pricebook;
            return pricebook;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static void deleteProductFromPricebook(String productId, String pricebookId) {
        try {
            List<PricebookEntry> pbeList = [
                    SELECT Id, Product2Id, Pricebook2Id
                    FROM PricebookEntry
                    WHERE Product2Id = :productId AND Pricebook2Id = :
                            pricebookId
            ];
            if (!pbeList.isEmpty()) {
                delete pbeList;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static void removeProductsFromPricebook(Pricebook2 pricebook, List<Object> products) {
        String productsString = JSON.serialize(products);
        List<FW_ProductWrapped> wrappedProducts = (List<FW_ProductWrapped>) JSON.deserialize(productsString,
                List<FW_ProductWrapped>.class);
        try {
            Set<String> productsIds = new Set<String>();
            for (FW_ProductWrapped prod : wrappedProducts) {
                productsIds.add(prod.id);
            }

            List<PricebookEntry> pbeList = [
                    SELECT Id, Product2Id, Pricebook2Id
                    FROM PricebookEntry
                    WHERE Product2Id IN :productsIds AND
                    Pricebook2Id = :pricebook.Id
            ];
            delete pbeList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}