({
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
        console.log('order');
    }
})