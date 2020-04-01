({
    onInit: function(component, event, helper){
        let loadPhotosAction = component.get('c.loadPhotos');
        loadPhotosAction.setParams({
           "id": component.get('v.recordId')
        });
        loadPhotosAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let photosObjects = response.getReturnValue();
                console.log('photosObject in response: '+JSON.stringify(photosObjects));
                component.set('v.photosObjects', photosObjects);
                for(let i=0; i<photosObjects.length; i++){
                }
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });

        let getMainPhotoAction = component.get('c.getMainPhoto');
        getMainPhotoAction.setParams({
           "productId": component.get('v.recordId')
        });
        getMainPhotoAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                console.log('response get main photo: '+JSON.stringify(response.getReturnValue()));
                component.set('v.mainPhoto', response.getReturnValue());
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });

        $A.enqueueAction(getMainPhotoAction);
        $A.enqueueAction(loadPhotosAction);
    },

    getPhotoFromEvent: function(component, event, helper){
        let mainPhoto = event.getParam('photo');
        component.set('v.mainPhoto', mainPhoto);
        component.find('customToast').showSuccessToast($A.get("$Label.c.Photo_Has_Been_Set_Successfully"));
    }
})