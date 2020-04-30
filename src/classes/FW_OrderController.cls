public with sharing class FW_OrderController {


    public static void deleteBasket() {
        try {
            Cache.SessionPartition sessionPartition = Cache.Session.getPartition('local.SOAPCredentials');
            Map<String, Integer> productsCachedMap = (Map<String, Integer>) sessionPartition.get('productsCachedMap');
            if (productsCachedMap != null) {
                sessionPartition.remove('productsCachedMap');
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static List<Order> getOrders() {
        List<Order> orders = [
                SELECT Id, Buyer__c, CreatedById, CreatedDate, BillingCountry, BillingState, BillingPostalCode, BillingCity, Price__c,
                        BillingStreet, Status, TotalAmount, EffectiveDate, OrderNumber, (
                        SELECT Id,
                                OrderId,
                                OrderItemNumber,
                                PricebookEntry.Product2.Name,
                                PricebookEntry.Product2.id,
                                DisplayUrl__c,
                                TotalPrice,
                                Quantity,
                                UnitPrice
                        FROM OrderItems
                )
                FROM Order
                WHERE CreatedById = :UserInfo.getUserId()
                ORDER BY CreatedDate DESC
        ];

        return orders;
    }

    public static void insertCase(String subject, String description, String orderId, String productId) {
        Case newCase = new Case();
        newCase.Subject = subject;
        newCase.Description = description;
        newCase.Order__c = orderId;
        newCase.ProductId = productId;
        try {
            insert newCase;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}