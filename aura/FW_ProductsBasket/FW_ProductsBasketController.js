({
    onInit: function(component, event, helper){
        component.set('v.showProductView', false);
        helper.returnProductsFromBasket(component);
    },

    refreshBasket: function(component, event, helper){
        let results = event.getParam('results');
        component.set('v.results', results);
        if(results != undefined && results != null && results != ''){
            component.set('v.totalPrice', results[0].totalPrice);
        }
    },

    setTotalPrice: function(component, event, helper){
        let totalPrice = Number(component.get('v.totalPrice'));
        let priceDifference = Number(event.getParam('priceDifference'));
        totalPrice += priceDifference;
        component.set('v.totalPrice', totalPrice.toFixed(2));
    },

    showProceedModal: function(component, event, helper){
        helper.doShowProceedModal(component, event);
    },

    showProduct: function(component, event, helper){
        let product = event.getParam('product');
        component.set('v.selectedItem', product);
        component.set('v.showProductView', true);
    }
})