({
    onInit: function(component, event, helper){
        component.set('v.showTotalPriceForProduct', false);
    },

    deleteFromBasket: function(component, event, helper){
        helper.doDeleteFromBasket(component);
    },

    decreaseQuantity: function(component, event, helper){
        let quantityInputValue = component.get('v.quantity');
        let productPrice = component.get('v.product.price');
        if(quantityInputValue > 0){
            if(quantityInputValue == 2){
                component.set('v.showTotalPriceForProduct', false);
            }
            let totalPriceForProduct = component.get('v.totalPriceForProduct');
            if(totalPriceForProduct == undefined){
                    totalPriceForProduct = productPrice;
            }
            let newQuantity = quantityInputValue-1;
            let newTotalPriceForProduct = newQuantity * productPrice;

            component.set('v.quantity', newQuantity);

            if(newQuantity == 0){
                component.set('v.showTotalPriceForProduct', true);
                newTotalPriceForProduct = 0;
                component.set('v.totalPriceForProduct', newTotalPriceForProduct.toFixed(2));
            }else{
                newTotalPriceForProduct = newQuantity * productPrice;
                component.set('v.totalPriceForProduct', newTotalPriceForProduct.toFixed(2));
            }

            let difference = -productPrice;
            component.set('v.priceDifference', difference);
            let sendPriceDifference = component.get('c.sendPriceDifference');
            $A.enqueueAction(sendPriceDifference);
        }
    },

    increaseQuantity: function(component, event, helper){
        let productPrice = component.get('v.product.price');
        let totalPriceForProduct = component.get('v.totalPriceForProduct');
        if(totalPriceForProduct == undefined){
            totalPriceForProduct = productPrice;
        }
        let quantityInputValue = component.get('v.quantity');
        let newQuantity = Number(quantityInputValue)+1;
        let newTotalPriceForProduct = newQuantity * productPrice;

        component.set('v.quantity', newQuantity);
        component.set('v.totalPriceForProduct', newTotalPriceForProduct.toFixed(2));
        let difference = productPrice;
        component.set('v.priceDifference', difference);

        if(quantityInputValue > 0){
            component.set('v.showTotalPriceForProduct', true);
        }else{
            component.set('v.showTotalPriceForProduct', false);
        }

        let sendPriceDifference = component.get('c.sendPriceDifference');
        $A.enqueueAction(sendPriceDifference);
    },

    changeQuantity: function(component, event, helper){
        let quantityInputValue = component.get('v.quantity');
        if(quantityInputValue == ''){
            quantityInputValue = 0;
            component.set('v.quantity', quantityInputValue);
        }
        let productPrice = component.get('v.product.price');
        let totalPriceForProduct = component.get('v.totalPriceForProduct');
        if(totalPriceForProduct == undefined){
            totalPriceForProduct = productPrice;
        }
        let newTotalPriceForProduct = quantityInputValue * productPrice;
        component.set('v.totalPriceForProduct', newTotalPriceForProduct.toFixed(2));
        let difference = newTotalPriceForProduct - totalPriceForProduct;
        component.set('v.priceDifference', difference);

        if(quantityInputValue != 1){
            component.set('v.showTotalPriceForProduct', true);
        }else{
            component.set('v.showTotalPriceForProduct', false);
        }

        let sendPriceDifference = component.get('c.sendPriceDifference');
        $A.enqueueAction(sendPriceDifference);
    },

    sendPriceDifference: function(component, event, helper){
        let priceDifference = component.get('v.priceDifference');
        let sendPriceDifference = component.getEvent("FW_SendPriceDifference");
        sendPriceDifference.setParams({
            "priceDifference": priceDifference
        });
        sendPriceDifference.fire();
    },

    selectItem: function(component, event, helper){
        let product = component.get("v.product");
        let selectedProductEvent = component.getEvent("selectedProduct");
        selectedProductEvent.setParams({
            "product": product
        });
        selectedProductEvent.fire();

        helper.returnSimilarProducts(component);
    }
})