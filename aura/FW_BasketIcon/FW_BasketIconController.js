({
    onInit: function(component, event, helper){
        helper.refreshBasketQuantity(component, event);
    },

    goToBasket: function(component, event, helper){
        window.open('https://fw-community-developer-edition.eu32.force.com/furnitureworldcommunity/s/basket', '_top');
    }
})