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
                let results = response.getReturnValue();
                let productsFromPricebook = component.get('v.productsFromPricebook');
                for(let i=0; i<productsFromPricebook.length; i++){
                    for(let j=0; j<results.length; j++){
                        if(results[j].id == productsFromPricebook[i].id){
                            results.splice(j,1);
                            break;
                        }
                    }
                }
                component.set('v.results', results);
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