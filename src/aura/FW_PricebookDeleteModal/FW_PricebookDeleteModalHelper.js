({
    doDeletePricebook: function(component, event){
        let action = component.get("c.removePricebook");
        action.setParams({
           "pricebookId": component.get('v.pricebook.Id')
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.find('customToast').showSuccessToast($A.get("$Label.c.Pricebook_Has_Been_Deleted_Successfully"));
                component.set('v.showPricebookDeleteModal', false);
                let sendDeletedPricebook = $A.get('e.c:FW_SendDeletedPricebook');
                sendDeletedPricebook.setParams({
                    "pricebook": component.get('v.pricebook')
                });
                sendDeletedPricebook.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})