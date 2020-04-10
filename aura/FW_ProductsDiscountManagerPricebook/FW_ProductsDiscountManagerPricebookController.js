({
    onInit: function(component, event, helper){
        component.set('v.name', null);
        component.set('v.startDate', null);
        component.set('v.endDate', null);
    },

    receiveSearchResults: function(component, event, helper){
        component.set("v.results", event.getParam("results"));
    },

    closeModal: function(component, event, helper){
        component.set('v.showModal', false);
        component.set('v.name', null);
        component.set('v.startDate', null);
        component.set('v.endDate', null);
    },

    addPricebook: function(component, event, helper){
        helper.doAddPricebook(component, event);
    }
})