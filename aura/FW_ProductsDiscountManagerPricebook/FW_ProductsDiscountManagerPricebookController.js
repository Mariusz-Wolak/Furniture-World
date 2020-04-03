({
    receiveSearchResults: function(component, event, helper){
        component.set("v.results", event.getParam("results"));
    },

    addPricebook: function(component, event, helper){
        helper.doAddPricebook(component, event);
    }
})