({
    closeComplaintModal: function(component, event, helper){
        console.log('close compaint modal');
        component.set('v.showComplaintsModal', false);
    },

    sendComplaint: function(component, event, helper){
        helper.doSendComplaint(component, event);
    }
})