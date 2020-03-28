({
    onInit: function(component, event, helper){
        helper.returnProductsFromBasket(component);
    },

    refreshBasket: function(component, event, helper){
        component.set('v.results', event.getParam('results'));
    }
})