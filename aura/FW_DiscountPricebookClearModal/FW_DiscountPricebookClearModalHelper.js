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
                letSendProducts = $A.get("e.c:FW_SendClearedProductsFromPricebook");
                letSendProducts.setParams({
                    "products": products
                 });
                letSendProducts.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})