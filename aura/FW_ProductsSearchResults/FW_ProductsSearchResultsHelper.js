({
    getAllProducts: function(component){
        let action = component.get("c.returnAllProducts");
        let results = component.get("v.results");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.results', response.getReturnValue());
            }else{
                let title = $A.get("$Label.c.Error");
                let message = $A.get("$Label.c.Error");
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                let toastComponent = component.find('customToast');
                toastComponent.ShowToast(title, message, 'error', 'sticky');
            }
        });
        $A.enqueueAction(action);
    }
})