public with sharing class FW_OrderController {

    public static Object getUserInfo() {
        try {
            List<User> users = [SELECT Id, Name, Address FROM User WHERE
                    Id = :UserInfo.getUserId()];
            return users[0];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}