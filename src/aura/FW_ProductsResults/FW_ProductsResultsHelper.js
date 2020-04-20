({
    checkIfProductsAreObserved: function(component){
        let results = component.get('v.results');
        let action = component.get('c.checkIfResultsAreObserved');
        action.setParams({
            "productsIds": results.id
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.observedIds', response.getReturnValue());
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})