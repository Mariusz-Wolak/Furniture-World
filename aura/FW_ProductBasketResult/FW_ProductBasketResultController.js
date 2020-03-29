({
    onInit: function(component, event, helper){
        component.set('v.showTotalPrice', false);
    },

    deleteFromBasket: function(component, event, helper){
        helper.doDeleteFromBasket(component);
    },

    decreaseQuantity: function(component, event, helper){
        let quantityInputValue = component.get('v.quantity');
        if(quantityInputValue > 0){
            if(quantityInputValue == 2){
                component.set('v.showTotalPrice', false);
            }
            let totalPrice = component.get('v.totalPrice');
            let productPrice = component.get('v.product.price');
            let newQuantity = quantityInputValue-1;
            component.set('v.quantity', newQuantity);

            if(newQuantity == 0){
                component.set('v.showTotalPrice', true);
                totalPrice = 0;
                component.set('v.totalPrice', totalPrice.toFixed(2));
            }else{
                totalPrice = (quantityInputValue-1)*productPrice;
                component.set('v.totalPrice', totalPrice.toFixed(2));
            }
        }
    },

    increaseQuantity: function(component, event, helper){
        let totalPrice = component.get('v.totalPrice');
        let quantityInputValue = component.get('v.quantity');
        let productPrice = component.get('v.product.price');
        let newQuantity = Number(quantityInputValue)+1;
        component.set('v.quantity', newQuantity);

        if(quantityInputValue > 0){
            totalPrice = newQuantity * productPrice;
            component.set('v.totalPrice', totalPrice.toFixed(2));
            component.set('v.showTotalPrice', true);
        }else{
            component.set('v.showTotalPrice', false);
        }
    },

    changeQuantity: function(component, event, helper){
        let quantityInputValue = component.get('v.quantity');
        let productPrice = component.get('v.product.price');

        let totalPrice = quantityInputValue * productPrice;
        component.set('v.totalPrice', totalPrice.toFixed(2));

        if(quantityInputValue != 1){
            component.set('v.showTotalPrice', true);
        }else{
            component.set('v.showTotalPrice', false);
        }
    }
})