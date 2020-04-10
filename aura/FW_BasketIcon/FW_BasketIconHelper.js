({
    refreshBasketQuantity: function(component, event){
        let action = component.get("c.getProductsFromBasket");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let results = response.getReturnValue();
                if(results != undefined && results != null && results != ''){
                    component.set('v.totalQuantity', results[0].totalQuantity);
                }
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})