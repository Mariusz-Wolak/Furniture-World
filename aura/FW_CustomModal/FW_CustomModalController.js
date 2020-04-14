({
    onInit: function(component, event, helper){
    },

    closeDeleteDivisionModal: function(component, event, helper) {
        component.set("v.deleteDivisionIsOpen", false);
    },

    deleteDivision: function(component, event, helper){
        helper.doDeleteDivision(component);
    },

    closeProceedBasketModal: function(component, event, helper){
        component.set('v.showProceedBasketModal', false);
    },

    order: function(component, event, helper){
        helper.doOrder(component, event);
    },

    closeOrderSummary: function(component, event, helper){
        component.set('v.showOrderSummary', false);
        window.open('https://fw-community-developer-edition.eu32.force.com/furnitureworldcommunity/s/orders', '_top');
    },

    closeOrderDetails: function(component, event, helper){
        component.set('v.showOrderDetails', false);
    },

    closeComplaintModal: function(component, event, helper){
        component.set('v.showComplaintsModal', false);
    },

    sendComplaint: function(component, event, helper){
        helper.doSendComplaint(component, event);
    }
})