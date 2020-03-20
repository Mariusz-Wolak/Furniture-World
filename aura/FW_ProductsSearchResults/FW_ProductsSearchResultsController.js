({
    onInit: function(component, event, helper){
        let meta = document.createElement("meta");
        meta.setAttribute("name", "format-detection");
        meta.setAttribute("http-equiv", "Content-Security-Policy")
        meta.setAttribute("content", "date=no;img-src 'self' data:");
        document.getElementsByTagName('head')[0].appendChild(meta);

        helper.getAllProducts(component);

        component.set('v.showItems', true);
    },

    receiveSearchResults: function(component, event, helper){
        let resultsFromEvent = event.getParam("results");
        component.set("v.results", resultsFromEvent);

        component.set('v.showItems', true);
        component.set('v.showProductView', false);
    },

    showProduct: function(component, event, helper){
        let product = event.getParam('product');
        component.set('v.selectedItem', product);

        component.set('v.showItems', false);
        component.set('v.showProductView', true);
    }
})