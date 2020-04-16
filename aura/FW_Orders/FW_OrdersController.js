({
    onInit: function(component, event, helper){
        component.set('v.showProductView', false);
        helper.returnOrders(component, event);
    },

    showProduct: function(component, event, helper){
        let product = event.getParam('product');
        component.set('v.selectedItem', product);
        component.set('v.showProductView', true);
    }
})