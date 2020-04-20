({
    returnProductsFromBasket: function(component, event){
        let action = component.get("c.getProductsFromBasket");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let results = response.getReturnValue();
                if(results != undefined && results != null && results != ''){
                    component.set('v.results', results);
                    component.set('v.totalPrice', results[0].totalPrice);
                }
            }else{
                let toastComponent = component.find('customToast');
                toastComponent.showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    },

    doShowProceedModal: function(component, event){
        let action = component.get("c.getUserInfo");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.currentUser', response.getReturnValue());
                component.set('v.showProceedBasketModal', true);
            }else{
                let toastComponent = component.find('customToast');
                toastComponent.showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})