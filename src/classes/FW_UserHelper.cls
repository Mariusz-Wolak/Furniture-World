public with sharing class FW_UserHelper {

    public static FW_UserWrapped getUserInfo() {
        try {
            List<User> users = [
                    SELECT Id, Name, Address
                    FROM User
                    WHERE Id = :UserInfo.getUserId()
            ];

            Address addr = users[0].Address;
            FW_UserWrapped userWrapped = new FW_UserWrapped(users[0].Id, users[0].Name, addr.street, addr.city, addr.state, addr.postalCode, addr.country);
            return userWrapped;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}