({
    order: function(component, event, helper){
        let currentUser = component.get('v.currentUser');
        let productsInBasket = component.get('v.productsInBasket');
        let totalPrice = component.get('v.totalPrice');
        let action = component.get('c.insertOrder');
        action.setParams({
           "currentUser": currentUser,
           "productsInBasket": productsInBasket,
           "totalPrice": totalPrice
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.find('customToast').showSuccessToast($A.get("$Label.c.Your_Order_Has_Been_Successfully_Processed"));
                component.set('v.showProceedBasketModal', false);
                this.clearBasket(component, event);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    },

    clearBasket: function(component, event){
        let action = component.get('c.deleteBasket');
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                window.open($A.get('$Label.c.FW_Orders_URL'), '_top');
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})