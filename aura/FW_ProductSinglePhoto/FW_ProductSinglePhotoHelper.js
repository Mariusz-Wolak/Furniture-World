({
    doSendMainPhoto: function(component, event, helper){
        let url = component.get('v.photoObject');
        let productId = component.get('v.productId');
        let action = component.get('c.setMainPhoto');
        action.setParams({
           "url": url,
           "productId": productId
        });
        console.log('doSendMainPhoto params: '+action.getParams());
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let myEvent = component.getEvent('FW_SendMainPhoto');
                let photo = component.get('v.photoObject');
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