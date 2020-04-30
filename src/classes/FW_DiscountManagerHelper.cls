public with sharing class FW_DiscountManagerHelper {

    public static Object insertPricebook(String name, Date startDate, Date endDate) {
        if (String.isBlank(name) || startDate == null || endDate == null) {
            throw new AuraHandledException('Please fill in given inputs.');
        }
        if (startDate > endDate) {
            throw new AuraHandledException(Label.Start_Date_Cant_Be_Earlier_Than_End_Date + '.');
        }
        List<Pricebook2> pricebooks = [Select Id, Name FROM Pricebook2];
        for (Pricebook2 pb : pricebooks) {
            if (pb.Name == name) {
                throw new AuraHandledException('This name is already in use');
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
}