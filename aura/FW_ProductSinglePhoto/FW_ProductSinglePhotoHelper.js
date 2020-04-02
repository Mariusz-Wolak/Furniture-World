({
    doSendMainPhoto: function(component, event, helper){
        let myEvent = component.getEvent('FW_SendMainPhoto');
        let photo = component.get('v.photoObject');
        photo.isSelected = true;
        component.set('v.photoObject', photo);
        myEvent.setParams({
           "photo": photo
        });
        myEvent.fire();

        let isCommunity = component.get('v.isCommunity');
        if(isCommunity == false){
            let productId = component.get('v.productId');
            let action = component.get('c.setMainPhoto');
            action.setParams({
               "url": photo.url,
               "productId": productId
            });
            action.setCallback(this, function(response){
                let state = response.getState();
                if(state === 'SUCCESS'){
                    component.find('customToast').showSuccessToast($A.get("$Label.c.Photo_Has_Been_Set_Successfully"));
                }else{
                    component.find('customToast').showErrorToast(response.getError());
                }
            });
            $A.enqueueAction(action);
        }
    }
})