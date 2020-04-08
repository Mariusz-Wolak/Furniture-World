({
    addToPricebook: function(component, event, helper){
        let product = component.get('v.product');
        let sendToPricebookEvent = $A.get('e.c:FW_SendProductToPricebook');
        sendToPricebookEvent.setParams({
            "product": product
        });
        sendToPricebookEvent.fire();
    }
})