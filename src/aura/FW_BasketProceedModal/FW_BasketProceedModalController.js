({
    closeProceedBasketModal: function(component, event, helper){
        component.set('v.showProceedBasketModal', false);
    },

    order: function(component, event, helper){
        helper.order(component, event);
    }
})