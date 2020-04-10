({
    addToPricebook: function(component, event, helper){
        let product = component.get('v.product');
        let sendToPricebookEvent = $A.get('e.c:FW_SendProductToPricebook');
        product.discountPrice = null;
        sendToPricebookEvent.setParams({
            "product": product
        });
        sendToPricebookEvent.fire();
    }
})