({
    doDeletePricebook: function(component, event){
        let action = component.get("c.removePricebook");
        action.setParams({
           "pricebookId": component.get('v.pricebook.Id')
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.find('customToast').showSuccessToast('Price book has been deleted successfully');
                component.set('v.showPricebookDeleteModal', false);
                let refreshPricebooksEvent = $A.get('e.c:FW_RefreshPricebooksList');
                refreshPricebooksEvent.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})