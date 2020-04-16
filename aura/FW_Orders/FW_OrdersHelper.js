({
    returnOrders: function(component, event){
        let action = component.get('c.getOrders');
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.results', response.getReturnValue());
                console.log()
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})