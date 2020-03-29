({
    returnProductsFromBasket: function(component, event){
        let action = component.get("c.getProductsFromBasket");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let results = response.getReturnValue();
                component.set('v.results', results);
                let totalPrice = results[0].totalPrice;
                component.set('v.totalPrice', totalPrice);
            }else{
                let toastComponent = component.find('customToast');
                toastComponent.showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})