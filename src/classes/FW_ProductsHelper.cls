public with sharing class FW_ProductsHelper {

    public static List<Object> getSearchResults(String name) {
        if (String.isNotBlank(name)) {
            try {
                String nameString = '%' + name + '%';
                List<Product2> products = [
                        SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c, (
                                SELECT Id
                                FROM
                                        FW_ObservedItems__r
                                WHERE CreatedById = :UserInfo.getUserId()
                        )
                        FROM Product2
                        WHERE Name LIKE :nameString AND Type__c = 'Furniture'
                ];

                List<FW_ProductWrapped> productsWrappedList = new List<FW_ProductWrapped>();

                Set<Id> productsIds = new Set<Id>();
                for (Product2 prod : products) {
                    productsIds.add(prod.Id);
                }

                List<AggregateResult> aggregateResults = [
                        SELECT Product2Id, MIN(UnitPrice) minPrice, MAX(UnitPrice) maxPrice
                        FROM
                                PricebookEntry
                        WHERE
                        Product2Id IN
                                :productsIds AND Pricebook2.StartDate__c <= TODAY AND Pricebook2.EndDate__c >= TODAY
                        GROUP BY Product2Id
                ];

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

                    for (AggregateResult aggrRes : aggregateResults) {
                        if (prod.Id == (String) aggrRes.get('Product2Id')) {
                            productWrapped.price = (Decimal) aggrRes.get('maxPrice');
                            productWrapped.pricebookEntryId = (String) aggrRes.get('Id');
                            if ((Decimal) aggrRes.get('maxPrice') > (Decimal) aggrRes.get('minPrice')) {
                                productWrapped.discountPrice = (Decimal) aggrRes.get('minPrice');
                            } else {
                                productWrapped.discountPrice = null;
                            }
                        }
                    }

                    productsWrappedList.add(productWrapped);
                }
                return productsWrappedList;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        } else {
            throw new AuraHandledException(Label.Fill_Blank_Value_Error);
        }
    }

    public static FW_ProductWrapped getProductInfo(String productId) {
        Product2 prod = [
                SELECT Id, DisplayUrl, Description, Name, Type__c, Family, (
                        SELECT Id
                        FROM
                                FW_ObservedItems__r
                        WHERE CreatedById = :UserInfo.getUserId()
                )
                FROM Product2
                WHERE Id = :productId AND Type__c = 'Furniture'
        ];

        List<PricebookEntry> standardPBEList = [
                SELECT Id, Product2Id, Pricebook2Id, UnitPrice
                FROM PricebookEntry
                WHERE Pricebook2.Name = 'Standard Price Book'
                AND Product2Id = :prod.Id
        ];

        FW_ProductWrapped productWrapped = new FW_ProductWrapped();
        productWrapped.id = prod.Id;
        productWrapped.displayUrl = prod.DisplayUrl;
        productWrapped.description = prod.Description;
        productWrapped.name = prod.Name;
        productWrapped.type = prod.Type__c;
        productWrapped.family = prod.Family;
        productWrapped.observedItems = prod.FW_ObservedItems__r;
        productWrapped.isObserved = !productWrapped.observedItems.isEmpty();
        productWrapped.price = standardPBEList[0].UnitPrice;

        return productWrapped;
    }

    public static List<Object> getNewestProducts() {
        try {
            List<Product2> products = [
                    SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c, CreatedDate, (
                            SELECT Id
                            FROM
                                    FW_ObservedItems__r
                            WHERE CreatedById = :UserInfo.getUserId()
                    )
                    FROM Product2
                    WHERE Type__c =
                            'Furniture'
                    ORDER BY CreatedDate DESC
                    LIMIT 12
            ];

            List<FW_ProductWrapped> productsWrappedList = new List<FW_ProductWrapped>();
            Set<Id> productsIds = new Set<Id>();

            for (Product2 prod : products) {
                productsIds.add(prod.Id);
            }

            List<AggregateResult> aggregateResults = [
                    SELECT Product2Id, MIN(UnitPrice) minPrice, MAX(UnitPrice) maxPrice
                    FROM
                            PricebookEntry
                    WHERE
                    Product2Id IN
                            :productsIds AND Pricebook2.StartDate__c <= TODAY AND Pricebook2.EndDate__c >= TODAY
                    GROUP BY Product2Id
            ];

            for (Product2 prod : products) {
                FW_ProductWrapped productWrapped = new FW_ProductWrapped();
                productWrapped.id = prod.Id;
                productWrapped.displayUrl = prod.DisplayUrl;
                productWrapped.description = prod.Description;
                productWrapped.name = prod.Name;
                productWrapped.type = prod.Type__c;
                productWrapped.family = prod.Family;
                productWrapped.price = prod.Price__c;
                productWrapped.observedItems = prod.FW_ObservedItems__r;
                productWrapped.isObserved = !productWrapped.observedItems.isEmpty();

                for (AggregateResult aggrRes : aggregateResults) {
                    if (prod.Id == (String) aggrRes.get('Product2Id')) {
                        productWrapped.price = (Decimal) aggrRes.get('maxPrice');
                        productWrapped.pricebookEntryId = (String) aggrRes.get('Id');
                        if ((Decimal) aggrRes.get('maxPrice') > (Decimal) aggrRes.get('minPrice')) {
                            productWrapped.discountPrice = (Decimal) aggrRes.get('minPrice');
                        } else {
                            productWrapped.discountPrice = null;
                        }
                    }
                }

                if (productWrapped.price != null) {
                    productsWrappedList.add(productWrapped);
                }
            }

            return productsWrappedList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}