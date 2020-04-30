public with sharing class FW_DiscountManagerController {

    @AuraEnabled
    public static Object insertPricebook(String name, Date startDate, Date endDate) {
        return FW_DiscountManagerHelper.insertPricebook(name, startDate, endDate);
    }
}