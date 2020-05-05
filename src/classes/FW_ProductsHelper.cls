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
                    FW_ProductWrapped productWrapped = new FW_ProductWrapped(prod.Id, prod.DisplayUrl, prod.Description, prod.Name, prod.Type__c, prod
                            .Family, prod.FW_ObservedItems__r);
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

        FW_ProductWrapped productWrapped = new FW_ProductWrapped(prod.Id, prod.DisplayUrl, prod.Description, prod.Name, prod.Type__c, prod
                .Family, prod.FW_ObservedItems__r);
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
                FW_ProductWrapped productWrapped = new FW_ProductWrapped(prod.Id, prod.DisplayUrl, prod.Description, prod.Name, prod.Type__c, prod
                        .Family, prod.FW_ObservedItems__r);
                productWrapped.price = prod.Price__c;
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

    public static List<Object> getSimilarProducts(String productFamily, String productId) {
        try {
            String productFamilyString = '%' + productFamily + '%';
            List<Product2> products = [
                    SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c, CreatedDate, (
                            SELECT Id
                            FROM FW_ObservedItems__r
                            WHERE CreatedById = :UserInfo.getUserId()
                    )
                    FROM Product2
                    WHERE
                    Type__c = 'Furniture' AND Family LIKE :productFamilyString AND (NOT Id = :productId)
                    LIMIT 4
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
                FW_ProductWrapped productWrapped = new FW_ProductWrapped(prod.Id, prod.DisplayUrl, prod.Description, prod.Name, prod.Type__c, prod
                        .Family, prod.FW_ObservedItems__r);
                productWrapped.price = prod.Price__c;
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
    }

    public static void insertToObserved(String productId) {
        try {
            FW_ObservedItem__c observedItem = new FW_ObservedItem__c();
            observedItem.Name = productId;
            insert observedItem;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static Boolean removeFromObserved(String productId) {
        try {
            List<FW_ObservedItem__c> observedItems = [
                    SELECT Name, CreatedById
                    FROM FW_ObservedItem__c
                    WHERE Name = :productId
                    AND CreatedById = :UserInfo.getUserId()
                    LIMIT 1
            ];
            Database.DeleteResult result = Database.delete(observedItems[0].Id);
            return result.isSuccess();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static Boolean checkIfProductIsObserved(String productId) {
        try {
            List<FW_ObservedItem__c> observedItems = [
                    SELECT Name, CreatedById
                    FROM FW_ObservedItem__c
                    WHERE Name = :productId
                    AND CreatedById = :UserInfo.getUserId()
            ];
            if (!observedItems.isEmpty()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static List<String> checkIfResultsAreObserved(String[] productsIds) {
        try {
            List<FW_ObservedItem__c> observedItems = [
                    SELECT Name, CreatedById
                    FROM FW_ObservedItem__c
                    WHERE Name IN
                            :productsIds AND CreatedById = :UserInfo.getUserId()
            ];
            if (!observedItems.isEmpty()) {
                List<Id> observedProductsId = new List<Id>();
                for (FW_ObservedItem__c item : observedItems) {
                    observedProductsId.add(item.Name);
                }
                return observedProductsId;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static List<Object> getObservedProducts() {
        try {
            List<FW_ObservedItem__c> observedItems = [SELECT Name, CreatedById FROM FW_ObservedItem__c WHERE CreatedById = :UserInfo.getUserId()];
            Set<Id> observedProductsIds = new Set<Id>();

            if (!observedItems.isEmpty()) {
                for (FW_ObservedItem__c item : observedItems) {
                    observedProductsIds.add(item.Name);
                }

                List<Product2> products = [
                        SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c, (SELECT Id FROM FW_ObservedItems__r WHERE CreatedById = :UserInfo.getUserId())
                        FROM Product2
                        WHERE Id IN :observedProductsIds
                ];

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

                List<FW_ProductWrapped> productsWrappedList = new List<FW_ProductWrapped>();
                for (Product2 prod : products) {
                    FW_ProductWrapped productWrapped = new FW_ProductWrapped(prod.Id, prod.DisplayUrl, prod.Description, prod.Name, prod.Type__c, prod
                            .Family, prod.FW_ObservedItems__r);
                    productWrapped.price = prod.Price__c;
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
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static void insertComment(String productId, String commentText, string rate) {
        try {
            List<FW_Rating__c> ratings = [
                    SELECT Id, Name, CreatedById
                    FROM FW_Rating__c
                    WHERE CreatedById = :UserInfo.getUserId() AND Name
                            = :productId
            ];
            if (!ratings.isEmpty()) {
                throw new FW_CustomException.OtherException(Label.You_Already_Rated_This_Item);
            }
            FW_Rating__c rateObject = new FW_Rating__c();
            rateObject.Name = productId;
            rateObject.Text__c = commentText;
            rateObject.Rate__c = Decimal.valueOf(rate);
            insert rateObject;
        } catch (FW_CustomException e) {
            FW_CustomExceptionData customException = new FW_CustomExceptionData(e.getMessage());
            throw new AuraHandledException(JSON.serialize(customException));
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static List<FW_Rating__c> getNewestComments(String productId) {
        String query = 'SELECT Name, Text__c, CreatedDate, FullName__c, Rate__c FROM FW_Rating__c WHERE Name =: ' +
                'productId ORDER BY CreatedDate DESC LIMIT 10';
        try {
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}