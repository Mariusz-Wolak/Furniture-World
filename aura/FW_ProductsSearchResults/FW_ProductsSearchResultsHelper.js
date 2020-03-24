({
    getAllProducts: function(component){
        let action = component.get("c.returnAllProducts");
        let results = component.get("v.results");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.results', response.getReturnValue());
            }else{
                let toastComponent = component.find('customToast');
                toastComponent.showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})