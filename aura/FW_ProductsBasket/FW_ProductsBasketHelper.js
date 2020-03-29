({
    returnProductsFromBasket: function(component, event){
        let action = component.get("c.getProductsFromBasket");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.results', response.getReturnValue());
            }else{
                let toastComponent = component.find('customToast');
                toastComponent.showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})