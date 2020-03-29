public with sharing class FW_BasketController {

    public static void insertToBasket(String productId) {
        try {
            Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.SOAPCredentials');
            Integer quantity = 1;
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

            if (productsCachedMap != null) {
                Set<String> productsIds = productsCachedMap.keySet();
                List<Product2> products = [
                        SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c
                        FROM Product2
                        WHERE Id IN :productsIds AND Type__c = 'Furniture'
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
                    productWrapped.quantity = productsCachedMap.get(prod.Id);
                    totalPrice += productWrapped.quantity * productWrapped.price;
                    productsWrappedList.add(productWrapped);
                }
            }
            for(FW_ProductWrapped pw: productsWrappedList){
                pw.totalPrice = totalPrice;
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