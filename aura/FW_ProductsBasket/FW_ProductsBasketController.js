({
    onInit: function(component, event, helper){
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

    }
})