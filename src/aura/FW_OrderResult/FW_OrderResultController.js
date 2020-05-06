({
    onInit: function(component, event, helper){
        component.set('v.showOrderDetails', false);
    },

    showDetails: function(component, event, helper){
        component.set('v.showOrderDetails', true);
    },

    showComplaintsModal: function(component, event, helper){
        component.set('v.showComplaintsModal', true);
    }
})