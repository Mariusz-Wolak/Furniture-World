({
    doSearch: function(component){
        let action = component.get("c.getSearchResults");
        let name = component.get("V.searchItemName");
        action.setParams({
            "name": name
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let appEvent = $A.get("e.c:FW_SendProductsToProductsList");
                appEvent.setParams({
                    "results": response.getReturnValue()
                });
                appEvent.fire();
            }else{
                let title = $A.get("$Label.c.Error");
                let message = $A.get("$Label.c.Error");
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                let toastComponent = component.find('customToast');
                toastComponent.showToast(title, message, 'error', 'sticky');
            }
        });
        $A.enqueueAction(action);
    }
})