
({
    doEditPricebook: function(component, event){
        let action = component.get('c.updatePricebook');
        action.setParams({
            "pricebook": component.get('v.pricebook')
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.find('customToast').showSuccessToast('Price book has been updated successfully');
                component.set('v.showPricebookDetailsModal', false);
                let updatedPricebook = response.getReturnValue();
                let sendPricebookEvent = $A.get('e.c:FW_SendUpdatedPricebook');
                sendPricebookEvent.setParams({
                    "pricebook": updatedPricebook
                });
                sendPricebookEvent.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})