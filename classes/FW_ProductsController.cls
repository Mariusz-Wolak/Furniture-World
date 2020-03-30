public with sharing class FW_ProductsController {

    public static String userId = UserInfo.getUserId();

    private static List<Object> getQuery(String name) {
        if (String.isNotBlank(name)) {
            String query = 'SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c FROM Product2 ' +
                    'WHERE Name LIKE \'%' + name + '%\' AND Type__c = \'Furniture\' ORDER BY Price__c ASC';
            List<Product2> products = Database.query(query);
            List<FW_ProductWrapped> productsWrappedList = new List<FW_ProductWrapped>();
            for(Product2 prod: products){
                FW_ProductWrapped productWrapped = new FW_ProductWrapped();
                productWrapped.id = prod.Id;
                productWrapped.displayUrl = prod.DisplayUrl;
                productWrapped.description = prod.Description;
                productWrapped.name = prod.Name;
                productWrapped.type = prod.Type__c;
                productWrapped.family = prod.Family;
                productWrapped.price = prod.Price__c;
                productsWrappedList.add(productWrapped);
            }
            return productsWrappedList;
        } else {
            throw new FW_CustomException.OtherException(Label.Fill_Blank_Value_Error);
        }
    }

    @AuraEnabled
    public static List<Object> getSearchResults(String name) {
        try {
            return getQuery(name);
        } catch (FW_CustomException e) {
            FW_CustomExceptionData customException = new FW_CustomExceptionData(e.getMessage());
            throw new AuraHandledException(JSON.serialize(customException));
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Object> getNewestProducts() {
        String query = 'SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c, CreatedDate FROM Product2 WHERE Type__c = ' +
                '\'Furniture\' ORDER BY CreatedDate DESC LIMIT 12';
        try {
            List<Product2> products = Database.query(query);
            List<FW_ProductWrapped> productsWrappedList = new List<FW_ProductWrapped>();
            for(Product2 prod: products){
                FW_ProductWrapped productWrapped = new FW_ProductWrapped();
                productWrapped.id = prod.Id;
                productWrapped.displayUrl = prod.DisplayUrl;
                productWrapped.description = prod.Description;
                productWrapped.name = prod.Name;
                productWrapped.type = prod.Type__c;
                productWrapped.family = prod.Family;
                productWrapped.price = prod.Price__c;
                productsWrappedList.add(productWrapped);
            }
            return productsWrappedList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void insertToObserved(String productId) {
        try {
            FW_ObservedItem__c observedItem = new FW_ObservedItem__c();
            observedItem.Name = productId;
            insert observedItem;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean removeFromObserved(String productId) {
        try {
            List<FW_ObservedItem__c> observedItems = [SELECT Name, CreatedById FROM FW_ObservedItem__c WHERE Name = :productId
            AND CreatedById =: userId LIMIT 1];
            Database.DeleteResult result = Database.delete(observedItems[0].Id);
            return result.isSuccess();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean checkIfProductIsObserved(String productId) {
        try {
            List<FW_ObservedItem__c> observedItems = [SELECT Name, CreatedById FROM FW_ObservedItem__c WHERE Name = :productId
            AND CreatedById =: userId];
            if (!observedItems.isEmpty()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<String> checkIfResultsAreObserved(String[] productsIds){
        try {
            List<FW_ObservedItem__c> observedItems = [SELECT Name, CreatedById FROM FW_ObservedItem__c WHERE Name IN
                    :productsIds AND CreatedById =: userId];
            if (!observedItems.isEmpty()) {
                List<Id> observedProductsId = new List<Id>();
                for(FW_ObservedItem__c item: observedItems){
                    observedProductsId.add(item.Name);
                }
                return observedProductsId;
            }else{
                return null;
            }
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Object> getObservedProducts() {
        try {
            List<FW_ObservedItem__c> observedItems = [SELECT Name, CreatedById FROM FW_ObservedItem__c WHERE CreatedById =: userId];
            Set<Id> observedProductsIds = new Set<Id>();

            if(!observedItems.isEmpty()){
                for(FW_ObservedItem__c item: observedItems){
                    observedProductsIds.add(item.Name);
                }

                List<Product2> products = [SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c
                                                    FROM Product2
                                                    WHERE Id IN :observedProductsIds];

                List<FW_ProductWrapped> productsWrappedList = new List<FW_ProductWrapped>();
                for(Product2 prod: products){
                    FW_ProductWrapped productWrapped = new FW_ProductWrapped();
                    productWrapped.id = prod.Id;
                    productWrapped.displayUrl = prod.DisplayUrl;
                    productWrapped.description = prod.Description;
                    productWrapped.name = prod.Name;
                    productWrapped.type = prod.Type__c;
                    productWrapped.family = prod.Family;
                    productWrapped.price = prod.Price__c;
                    productsWrappedList.add(productWrapped);
                }
                return productsWrappedList;
            }else{
                return null;
            }
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void insertComment(String productId, String commentText, string rate){
        try {
            String userId = UserInfo.getUserId();
            List<FW_Rating__c> ratings = [SELECT Id, Name, CreatedById FROM FW_Rating__c WHERE CreatedById =: userId AND Name
                    =: productId];
            if(!ratings.isEmpty()){
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

    @AuraEnabled
    public static List<FW_Rating__c> getNewestComments(String productId) {
        String query = 'SELECT Name, Text__c, CreatedDate, FullName__c, Rate__c FROM FW_Rating__c WHERE Name =: ' +
                'productId ORDER BY CreatedDate DESC LIMIT 10';
        try {
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Object> getSimilarProducts(String productFamily, String productId){
        String query = 'SELECT Id, DisplayUrl, Description, Name, Type__c, Family, Price__c, CreatedDate FROM Product2 WHERE Type__c = ' +
                '\'Furniture\' AND Family LIKE \'%' + productFamily + '%\' AND (NOT Id = \'' + productId + '\') LIMIT 4';
        try {
            List<Product2> products = Database.query(query);
            List<FW_ProductWrapped> productsWrappedList = new List<FW_ProductWrapped>();
            for(Product2 prod: products){
                FW_ProductWrapped productWrapped = new FW_ProductWrapped();
                productWrapped.id = prod.Id;
                productWrapped.displayUrl = prod.DisplayUrl;
                productWrapped.description = prod.Description;
                productWrapped.name = prod.Name;
                productWrapped.type = prod.Type__c;
                productWrapped.family = prod.Family;
                productWrapped.price = prod.Price__c;
                productsWrappedList.add(productWrapped);
            }
            return productsWrappedList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<FW_ProductWrapped> insertToBasket(String productId) {
        return FW_BasketController.insertToBasket(productId);
    }

    @AuraEnabled
    public static List<FW_ProductWrapped> getProductsFromBasket(){
        return FW_BasketController.getProductsFromBasket();
    }

    @AuraEnabled
    public static List<FW_ProductWrapped> removeFromBasket(String productId){
        return FW_BasketController.removeFromBasket(productId);
    }

    @AuraEnabled
    public static Object getUserInfo(){
        return FW_OrderController.getUserInfo();
    }

    @AuraEnabled
    public static void insertOrder(Object account, Object[] productsInBasket, Decimal totalPrice){
        FW_OrderController.insertOrder((User)account, productsInBasket, totalPrice);
    }

    @AuraEnabled
    public static void deleteBasket(){
        FW_OrderController.deleteBasket();
    }
}