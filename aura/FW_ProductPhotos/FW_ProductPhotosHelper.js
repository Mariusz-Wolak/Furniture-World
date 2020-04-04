({
    loadMainPhoto: function(component, event, helper){
        let getMainPhotoAction = component.get('c.getMainPhoto');
        getMainPhotoAction.setParams({
           "productId": component.get('v.productId')
        });
        getMainPhotoAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let mainPhotoUrl = response.getReturnValue();
                component.set('v.mainPhoto', mainPhotoUrl);
                let srcImg = component.get('v.mainPhoto.url');
                this.doLoadPhotos(component, mainPhotoUrl);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });

        $A.enqueueAction(getMainPhotoAction);
    },

    doLoadPhotos: function(component, mainPhotoUrl){
        let loadPhotosAction = component.get('c.loadPhotos');
        loadPhotosAction.setParams({
           "id": component.get('v.productId')
        });
        loadPhotosAction.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let photosObjects = [];
                for(let url of response.getReturnValue()){
                    let mainUrl = new URL(mainPhotoUrl);
                    let photoUrl = new URL(url);
                    let isSelected = mainUrl.search === photoUrl.search;

                    let photoObject = {
                        url: url,
                        isSelected : isSelected
                    };
                    if(isSelected){
                        photosObjects.unshift(photoObject)
                    }else{
                        photosObjects.push(photoObject);
                    }

                }
                component.set('v.photosObjects', photosObjects);
                for(let i=0; i<photosObjects.length; i++){
                }
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });

        $A.enqueueAction(loadPhotosAction);
    },

    deselectPhotos: function(component, mainPhoto){
        let photosObjects = component.get('v.photosObjects');
        for(let photo of photosObjects){
            if(photo.url != mainPhoto.url){
                photo.isSelected = false;
            }
        }
        component.set('v.photosObjects', photosObjects);
    }
})