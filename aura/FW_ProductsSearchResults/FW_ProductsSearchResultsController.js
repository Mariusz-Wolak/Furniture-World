({
    receiveSearchResults: function(component, event, helper){
        let resultsFromEvent = event.getParam("results");
        component.set("v.results", resultsFromEvent);
    }
})