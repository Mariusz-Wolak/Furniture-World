({
    doLoadPhotos: function(component, event){
        let loadPhotosAction = component.get('c.loadPhotos');
        loadPhotosAction.setParams({
           "id": component.get('v.recordId')
        });
        loadPhotosAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let photosObjects = response.getReturnValue();
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
                component.set('v.mainPhoto', response.getReturnValue());
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });

        $A.enqueueAction(getMainPhotoAction);
        $A.enqueueAction(loadPhotosAction);
    }
})