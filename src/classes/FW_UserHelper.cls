public with sharing class FW_UserHelper {

    public static FW_UserWrapped getUserInfo() {
        try {
            List<User> users = [
                    SELECT Id, Name, Address
                    FROM User
                    WHERE Id = :UserInfo.getUserId()
            ];
            FW_UserWrapped userWrapped = new FW_UserWrapped();
            userWrapped.id = users[0].Id;
            userWrapped.name = users[0].Name;
            Address addr = users[0].Address;
            userWrapped.street = addr.street;
            userWrapped.city = addr.city;
            userWrapped.state = addr.state;
            userWrapped.postalCode = addr.postalCode;
            userWrapped.country = addr.country;
            return userWrapped;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}