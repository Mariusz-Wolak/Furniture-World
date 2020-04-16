({
    doSelectItem: function(component, event, helper){
        let orderItem = component.get('v.orderItem');
        let productId = orderItem.PricebookEntry.Product2Id;

        let action = component.get('c.getProductInfo');
        action.setParams({
            "productId": productId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let product = response.getReturnValue();
                product.price = orderItem.UnitPrice;
                component.set('v.product', product);

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
                
                let scrollOptions = {
                    left: 0,
                    top: 0,
                    behavior: 'smooth'
                }
                window.scrollTo(scrollOptions);

                this.returnSimilarProducts(component);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    },

     returnSimilarProducts: function(component){
        let productFamily = component.get('v.product.family');
        let productId = component.get('v.product.id');
        let action = component.get('c.getSimilarProducts');
        action.setParams({
            "productFamily": productFamily,
            "productId": productId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let appEvent = $A.get("e.c:FW_SendSimilarProducts");
                appEvent.setParams({
                    "products": response.getReturnValue()
                });
                appEvent.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})