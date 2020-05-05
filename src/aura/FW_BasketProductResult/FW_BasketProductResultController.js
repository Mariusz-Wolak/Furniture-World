({
    onInit: function(component, event, helper){
        let product = component.get('v.product');
        let quantity = component.get('v.quantity');
        let price = product.price;
        let discountPrice = product.discountPrice;
        let actualPrice;
        if(discountPrice < price){
            product.actualPrice = discountPrice;
        }else{
            product.actualPrice = price;
        }
        product.totalPriceForProduct = product.actualPrice * quantity;
        product.totalPriceForProduct = product.totalPriceForProduct.toFixed(2);
        component.set('v.product', product);
    },

    deleteFromBasket: function(component, event, helper){
        helper.deleteFromBasket(component);
    },

    decreaseQuantity: function(component, event, helper){
        let product = component.get('v.product');
        let quantityInputValue = component.get('v.quantity');
        let productPrice = product.actualPrice
        if(quantityInputValue > 1){
            if(product.totalPriceForProduct == undefined){
                    product.totalPriceForProduct = productPrice;
            }
            let newQuantity = quantityInputValue-1;
            product.totalPriceForProduct = newQuantity * productPrice;
            product.totalPriceForProduct = product.totalPriceForProduct.toFixed(2);
            component.set('v.quantity', newQuantity);
            component.set('v.product', product);
            let difference = -productPrice;
            component.set('v.priceDifference', difference);
            let sendPriceDifference = component.get('c.sendPriceDifference');
            $A.enqueueAction(sendPriceDifference);
        }
    },

    increaseQuantity: function(component, event, helper){
        let product = component.get('v.product');
        let productPrice = component.get('v.product.actualPrice');
        if(product.totalPriceForProduct == undefined){
            product.totalPriceForProduct = productPrice;
        }
        let quantityInputValue = component.get('v.quantity');
        let newQuantity = Number(quantityInputValue)+1;
        product.totalPriceForProduct = newQuantity * productPrice;
        product.totalPriceForProduct = product.totalPriceForProduct.toFixed(2);
        component.set('v.quantity', newQuantity);
        component.set('v.product', product);
        let difference = productPrice;
        component.set('v.priceDifference', difference);

        let sendPriceDifference = component.get('c.sendPriceDifference');
        $A.enqueueAction(sendPriceDifference);
    },

    changeQuantity: function(component, event, helper){
        let quantityInputValue = component.get('v.quantity');
        if(quantityInputValue == '' || quantityInputValue == '0'){
            quantityInputValue = 1;
            component.set('v.quantity', quantityInputValue);
        }

        let product = component.get('v.product');
        let productPrice = component.get('v.product.actualPrice');
        if(product.totalPriceForProduct == undefined){
            product.totalPriceForProduct = productPrice;
        }
        let newTotalPriceForProduct = quantityInputValue * productPrice;
        let difference = newTotalPriceForProduct - product.totalPriceForProduct;
        component.set('v.priceDifference', difference);
        product.totalPriceForProduct = newTotalPriceForProduct.toFixed(2);
        component.set('v.product', product);

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

        let appEvent = $A.get('e.c:FW_ProductIdSendToRecordView');
        appEvent.setParams({
            "productId": product.id
        });
        appEvent.fire();

        helper.returnSimilarProducts(component);

        let scrollOptions = {
            left: 0,
            top: 0,
            behavior: 'smooth'
        }
        window.scrollTo(scrollOptions);
    }
})