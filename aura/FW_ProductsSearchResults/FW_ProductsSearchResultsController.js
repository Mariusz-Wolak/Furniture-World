({
    onInit: function(component, event, helper){
        let meta = document.createElement("meta");
        meta.setAttribute("name", "format-detection");
        meta.setAttribute("http-equiv", "Content-Security-Policy")
        meta.setAttribute("content", "date=no;img-src 'self' data:");
        document.getElementsByTagName('head')[0].appendChild(meta);
        helper.getAllProducts(component);
    },

    receiveSearchResults: function(component, event, helper){
        let resultsFromEvent = event.getParam("results");
        component.set("v.results", resultsFromEvent);
    }
})