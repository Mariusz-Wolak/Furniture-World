({
    onInit: function(component, event, helper){
        console.log('on init single photo');
    },

    sendMainPhoto: function(component, event, helper){
        helper.doSendMainPhoto(component, event);
    }
})