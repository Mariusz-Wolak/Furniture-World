({
    doSendMainPhoto: function(component, event, helper){
        let url = component.get('v.photoObject.imgURL__c');
        let productId = component.get('v.productId');
        let action = component.get('c.setMainPhoto');
        action.setParams({
           "url": url,
           "productId": productId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let myEvent = component.getEvent('FW_SendMainPhoto');
                let photo = component.get('v.photoObject.imgURL__c');
                myEvent.setParams({
                   "photo": photo
                });
                myEvent.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})