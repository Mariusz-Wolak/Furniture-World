
({
    setMainPhoto: function(component, event, helper){
        let myEvent = component.getEvent('FW_SendMainPhoto');
        let photo = component.get('v.photo');
        myEvent.setParams({
           "photo": photo
        });
        myEvent.fire();
    }
})