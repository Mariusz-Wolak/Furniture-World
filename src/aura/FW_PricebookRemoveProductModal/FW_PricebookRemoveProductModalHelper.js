({
    doRemoveProduct: function(component, event){
        let product = component.get('v.product');
        let pricebook = component.get('v.selectedPricebook');

        let sendRemovedProductEvent = $A.get('e.c:FW_SendRemovedProductFromPricebook');
        sendRemovedProductEvent.setParams({
            "product": product
        });
        sendRemovedProductEvent.fire();
        let action = component.get('c.deleteProductFromPricebook');
        action.setParams({
            "productId":  product.id,
            "pricebookId": pricebook.Id
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.find('customToast').showSuccessToast($A.get("$Label.c.Product_Has_Been_Removed_From_Pricebook_Successfully"));
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})