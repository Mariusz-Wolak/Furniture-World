({
    onInit: function(component, event, helper){
        component.set('v.name', null);
        component.set('v.startDate', null);
        component.set('v.endDate', null);
    },

    closeModal: function(component, event, helper){
        console.log('close add pricebook modal 18:56');
        component.set('v.showModal', false);
        component.set('v.name', null);
        component.set('v.startDate', null);
        component.set('v.endDate', null);
    },

    addPricebook: function(component, event, helper){
        helper.doAddPricebook(component, event);
    }
})