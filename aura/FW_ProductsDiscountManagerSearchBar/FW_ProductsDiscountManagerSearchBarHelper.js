({
    doSearch: function(component){
        let action = component.get("c.getSearchResults");
        let name = component.get("v.searchItemName");
        action.setParams({
            "name": name
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.results', response.getReturnValue());
//                let cmpEvent = component.getEvent('FW_SendProductsToDiscountManager');
//                cmpEvent.setParams({
//                    "results": response.getReturnValue(),
//                    "searchItemName": name
//                });
//                cmpEvent.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})