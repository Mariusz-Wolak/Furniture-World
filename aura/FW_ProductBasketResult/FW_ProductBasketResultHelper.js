({
    doDeleteFromBasket: function(component){
        let deleteIcon = component.find('deleteIcon');
        let productId = component.get('v.product.id');

        let action = component.get('c.removeFromBasket');
        action.setParams({
           "productId":  productId
        });

        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let refreshBasketEvent = $A.get("e.c:FW_ProductsBasketRefreshedEvent");
                refreshBasketEvent.setParams({
                    "results": response.getReturnValue()
                });
                refreshBasketEvent.fire();
                component.find('customToast').showSuccessToast($A.get('$Label.c.Item_Has_Been_Removed_From_Basket'));
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

                    console.log('response in similar prods in basket result: '+response.getReturnValue());
                appEvent.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})