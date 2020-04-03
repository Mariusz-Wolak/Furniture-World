({
    onInit: function(component, event, helper){
        helper.receivePricebooksList(component, event);
    },

    receiveSearchResults: function(component, event, helper){
        component.set("v.results", event.getParam("results"));
    },

    receiveNewPricebook: function(component, event, helper){
        let newPricebook = event.getParam("pricebook");
        let pricebooksList = component.get('v.pricebooksList');
        pricebooksList.push(newPricebook);
        component.set('v.pricebooksList', pricebooksList);
    }
})