public with sharing class FW_ComplaintsHelper {

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