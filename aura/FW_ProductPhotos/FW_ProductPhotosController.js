({
    onInit: function(component, event, helper){
        helper.doLoadPhotos(component, event);
    },

    getPhotoFromEvent: function(component, event, helper){
        let mainPhoto = event.getParam('photo');
        component.set('v.mainPhoto', mainPhoto);
        component.find('customToast').showSuccessToast($A.get("$Label.c.Photo_Has_Been_Set_Successfully"));
    }
})