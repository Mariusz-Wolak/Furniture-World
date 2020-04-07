({
    receiveSearchResults: function(component, event, helper){
        component.set("v.results", event.getParam("results"));
    },

    closeModal: function(component, event, helper){
        component.set('v.showModal', false);
    },

    addPricebook: function(component, event, helper){
        helper.doAddPricebook(component, event);
    }
})