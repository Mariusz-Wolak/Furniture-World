({
    doRemoveProduct: function(component, event){
        console.log('doRemoveProduct modal helper');
        let product = component.get('v.product');
        console.log('product in helper: '+JSON.stringify(product));
        let pricebook = component.get('v.selectedPricebook');
        console.log('pricebook: '+JSON.stringify(pricebook));


        let sendRemovedProductEvent = $A.get('e.c:FW_SendRemovedProductFromPricebook');
        sendRemovedProductEvent.setParams({
            "product": product
        });


        let action = component.get('c.deleteProductFromPricebook');
        console.log('before set params');
        action.setParams({
            "productId":  product.id,
            "pricebookId": pricebook.Id
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.find('customToast').showSuccessToast('Product has been removed from price book successfully');
                sendRemovedProductEvent.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})