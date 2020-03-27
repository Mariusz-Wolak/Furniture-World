public with sharing class FW_BasketController {

    public static void insertToBasket(String productId) {
        try{
            Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.SOAPCredentials');
            Integer quantity = 1;
            Map<String, Integer> productsCachedMap =  (Map<String, Integer>) sessionPartition.get('productsCachedMap');

            if(productsCachedMap != null) {
                sessionPartition.remove('productsCachedMap');

                if (productsCachedMap.containsKey(productId)) {
                    quantity += productsCachedMap.remove(productId);
                }
                productsCachedMap.put(productId, quantity);
                sessionPartition.put('productsCachedMap', productsCachedMap);
            }else{
                productsCachedMap = new Map<String, Integer>();
                productsCachedMap.put(productId, quantity);
                sessionPartition.put('productsCachedMap', productsCachedMap);
            }
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static List<FW_ProductWrapped> getProductsFromBasket(){
        try {
            Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.SOAPCredentials');
            Map<String, Integer> productsCachedMap = (Map<String, Integer>) sessionPartition.get('productsCachedMap');
            List<FW_ProductWrapped> productsWrapped = new List<FW_ProductWrapped>();

            if(productsCachedMap != null) {
                for(String productId: productsCachedMap.keySet()){
                    FW_ProductWrapped product = new FW_ProductWrapped();

                }

            }

            return productsWrapped;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}