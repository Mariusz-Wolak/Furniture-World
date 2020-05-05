({
    onInit: function(component, event, helper){
        component.set('v.name', null);
        component.set('v.startDate', null);
        component.set('v.endDate', null);
    },

    closeModal: function(component, event, helper){
        component.set('v.showModal', false);
        component.set('v.name', null);
        component.set('v.startDate', null);
        component.set('v.endDate', null);
    },

    addPricebook: function(component, event, helper){
        helper.addPricebook(component, event);
    }
})