({
    onInit: function(component, event, helper){
        helper.loadMainPhoto(component, event);
    },

    getPhotoFromEvent: function(component, event, helper){
        let mainPhoto = event.getParam('photo');
        component.set('v.mainPhoto', mainPhoto.url);
        helper.deselectPhotos(component, mainPhoto);
    }
})