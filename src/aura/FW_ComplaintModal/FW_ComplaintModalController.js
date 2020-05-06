({
    closeComplaintModal: function(component, event, helper){
        component.set('v.showComplaintsModal', false);
    },

    sendComplaint: function(component, event, helper){
        helper.sendComplaint(component, event);
    }
})