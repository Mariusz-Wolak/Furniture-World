({
    onInit: function(component, event, helper){
        component.set('v.productId', component.get('v.recordId'));
        helper.loadMainPhoto(component, event);
    },

    getPhotoFromEvent: function(component, event, helper){
        let mainPhoto = event.getParam('photo');
        component.set('v.mainPhoto', mainPhoto.url);
        helper.deselectPhotos(component, mainPhoto);
    },

    loadPhoto: function(component, event, helper){
        component.set('v.productId', event.getParam('productId'));
        helper.loadMainPhoto(component, event);
    }
})