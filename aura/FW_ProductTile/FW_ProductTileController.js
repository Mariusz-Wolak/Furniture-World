({
    onInit: function(component, event, helper){
        let meta = document.createElement("meta");
        meta.setAttribute("name", "format-detection");
        meta.setAttribute("http-equiv", "Content-Security-Policy")
        meta.setAttribute("content", "date=no;img-src 'self' data:");
        document.getElementsByTagName('head')[0].appendChild(meta);
    },

    selectItem: function(component, event, helper){
        let selectedProductEvent = component.getEvent("selectedProduct");
        let product = component.get("v.item");
        selectedProductEvent.setParams({
            "product": product
        });
        selectedProductEvent.fire();
    },

    toggleObserved: function(component, event, helper){
        helper.doToggleObserved(component);
    },
})