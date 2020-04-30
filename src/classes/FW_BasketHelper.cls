public with sharing class FW_BasketHelper {

    public static List<FW_ProductWrapped> insertToBasket(String productId, Integer quantity) {
        try {
            Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.SOAPCredentials');
            Map<String, Integer> productsCachedMap = (Map<String, Integer>) sessionPartition.get('productsCachedMap');

            if (productsCachedMap != null) {
                sessionPartition.remove('productsCachedMap');

                if (productsCachedMap.containsKey(productId)) {
                    quantity += productsCachedMap.remove(productId);
                }
                productsCachedMap.put(productId, quantity);
                sessionPartition.put('productsCachedMap', productsCachedMap);
            } else {
                productsCachedMap = new Map<String, Integer>();
                productsCachedMap.put(productId, quantity);
                sessionPartition.put('productsCachedMap', productsCachedMap);
            }
            return getProductsFromBasket();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static List<FW_ProductWrapped> getProductsFromBasket() {
        try {
            Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.SOAPCredentials');
            Map<String, Integer> productsCachedMap = (Map<String, Integer>) sessionPartition.get('productsCachedMap');
            List<FW_ProductWrapped> productsWrappedList = new List<FW_ProductWrapped>();
            Decimal totalPrice = 0;
            Integer totalQuantity = 0;

            if (productsCachedMap != null) {
                Set<String> productsIds = productsCachedMap.keySet();
                List<Product2> products = [
                        SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c,
                        (SELECT Id FROM FW_ObservedItems__r WHERE CreatedById = :UserInfo.getUserId())
                        FROM Product2
                        WHERE Id IN :productsIds AND Type__c = 'Furniture'
                ];

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
                    productWrapped.quantity = productsCachedMap.get(prod.Id);

                    for (AggregateResult aggrRes : aggregateResults) {
                        if (prod.Id == (String) aggrRes.get('Product2Id')) {
                            productWrapped.price = (Decimal) aggrRes.get('maxPrice');
                            productWrapped.pricebookEntryId = (String) aggrRes.get('Id');
                            if ((Decimal) aggrRes.get('maxPrice') > (Decimal) aggrRes.get('minPrice')) {
                                productWrapped.discountPrice = (Decimal) aggrRes.get('minPrice');
                            } else {
                                productWrapped.discountPrice = null;
                            }
                            break;
                        }
                    }
                    totalQuantity += productWrapped.quantity;
                    if(productWrapped.discountPrice < productWrapped.price){
                        totalPrice += productWrapped.quantity * productWrapped.discountPrice;
                    }else{
                        totalPrice += productWrapped.quantity * productWrapped.price;
                    }
                    productsWrappedList.add(productWrapped);
                }
            }
            for (FW_ProductWrapped pw : productsWrappedList) {
                pw.totalPrice = totalPrice;
                pw.totalQuantity = totalQuantity;
            }

            return productsWrappedList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static List<FW_ProductWrapped> removeFromBasket(String productId) {
        try {
            Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.SOAPCredentials');
            Map<String, Integer> productsCachedMap = (Map<String, Integer>) sessionPartition.get('productsCachedMap');
            if (productsCachedMap != null) {
                sessionPartition.remove('productsCachedMap');
                productsCachedMap.remove(productId);
                sessionPartition.put('productsCachedMap', productsCachedMap);
            }

            return getProductsFromBasket();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}