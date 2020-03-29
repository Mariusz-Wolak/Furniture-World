({
    onInit: function(component, event, helper){
        helper.checkIfProductsAreObserved(component);
    },

    setTotalQuantity: function(component, event, helper){
        component.set('v.totalQuantity', event.getParam('totalQuantity'));
    }
})