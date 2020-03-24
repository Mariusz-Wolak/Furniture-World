({
    onInit: function(component, event, helper){
        let meta = document.createElement("meta");
        meta.setAttribute("name", "format-detection");
        meta.setAttribute("http-equiv", "Content-Security-Policy")
        meta.setAttribute("content", "date=no;img-src 'self' data:");
        document.getElementsByTagName('head')[0].appendChild(meta);

        helper.returnObservedProducts(component);
        component.set('v.header', $A.get('$Label.c.Observed_Products'));
        component.set('v.showItems', true);
    },

    showProduct: function(component, event, helper){
        let product = event.getParam('product');
        component.set('v.selectedItem', product);
        component.set('v.showItems', false);
        component.set('v.showProductView', true);
    }
})