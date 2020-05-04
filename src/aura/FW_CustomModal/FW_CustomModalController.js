({


    closeOrderSummary: function(component, event, helper){
        component.set('v.showOrderSummary', false);
        window.open($A.get('$Label.c.FW_Orders_URL'), '_top');
    },

    closeComplaintModal: function(component, event, helper){
        component.set('v.showComplaintsModal', false);
    },

    sendComplaint: function(component, event, helper){
        helper.doSendComplaint(component, event);
    }
})