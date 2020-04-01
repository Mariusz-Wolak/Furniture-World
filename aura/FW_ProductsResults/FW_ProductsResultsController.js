({
    onInit: function(component, event, helper){
        let meta = document.createElement("meta");
        meta.setAttribute("name", "format-detection");
        meta.setAttribute("http-equiv", "Content-Security-Policy")
        meta.setAttribute("content", "date=no;img-src 'self' data:");
        document.getElementsByTagName('head')[0].appendChild(meta);

        helper.checkIfProductsAreObserved(component);
    },

    setTotalQuantity: function(component, event, helper){
        component.set('v.totalQuantity', event.getParam('totalQuantity'));
        component.find('customToast').showSuccessToast($A.get('$Label.c.Item_Has_Been_Added_To_Basket'));
    }
})