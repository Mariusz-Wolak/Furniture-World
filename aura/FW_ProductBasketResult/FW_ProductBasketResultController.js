({
    deleteFromBasket: function(component, event, helper){
        helper.doDeleteFromBasket(component);
    },

    decreaseQuantity: function(component, event, helper){
        let quantityInputValue = component.get('v.quantity');
        if(quantityInputValue > 0){
            component.set('v.quantity', quantityInputValue-1);
        }
    },

    increaseQuantity: function(component, event, helper){
        let quantityInputValue = component.get('v.quantity');
        component.set('v.quantity', quantityInputValue+1);
    }
})