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
                    "results": response.getReturnValue(),
                    "searchItemName": name
                });
                appEvent.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})