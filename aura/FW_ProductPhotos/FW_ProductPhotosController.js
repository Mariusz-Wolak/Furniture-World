({
    onInit: function(component, event, helper){
        helper.doLoadPhotos(component, event);
    },

    getPhotoFromEvent: function(component, event, helper){
        let mainPhoto = event.getParam('photo');
        component.set('v.mainPhoto', mainPhoto);
    }
})