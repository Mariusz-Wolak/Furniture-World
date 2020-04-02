({
    receiveSearchResults: function(component, event, helper){
        component.set("v.results", event.getParam("results"));
    }
})