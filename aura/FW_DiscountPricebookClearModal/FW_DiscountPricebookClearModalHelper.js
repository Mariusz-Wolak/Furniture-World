({
    doClearPricebook: function(component, event){
        let products = component.get('v.resultsFromSelectedPricebook')
        let action = component.get("c.removeProductsFromPricebook");
        action.setParams({
            "pricebook": component.get('v.pricebook'),
            "products": products
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.find('customToast').showSuccessToast('Price Book has been cleared successfully');
                let sendProducts = $A.get("e.c:FW_SendClearedProductsFromPricebook");
                sendProducts.setParams({
                    "products": products
                 });
                sendProducts.fire();
                component.set('v.showPricebookClearModal', false);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})