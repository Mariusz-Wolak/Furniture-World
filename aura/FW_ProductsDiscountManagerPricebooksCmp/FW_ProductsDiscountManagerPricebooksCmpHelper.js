({
    receivePricebooksList: function(component, event){
        let action = component.get('c.getPricebooksList');
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let pricebooks = response.getReturnValue();
                component.set('v.pricebooks', pricebooks);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})