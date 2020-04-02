({
    onInit: function(component, event, helper){
        let srcImg = component.get('v.mainPhoto.url');
        helper.loadMainPhoto(component, event);
    },

    getPhotoFromEvent: function(component, event, helper){
        let mainPhoto = event.getParam('photo');
        component.set('v.mainPhoto', mainPhoto.url);
        helper.deselectPhotos(component, mainPhoto);
    }
})