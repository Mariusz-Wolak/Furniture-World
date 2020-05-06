({
    onInit: function(component, event, helper){
        helper.refreshBasketQuantity(component, event);
    },

    goToBasket: function(component, event, helper){
        window.open($A.get('$Label.c.FW_Basket_URL'), '_top');
    }
})