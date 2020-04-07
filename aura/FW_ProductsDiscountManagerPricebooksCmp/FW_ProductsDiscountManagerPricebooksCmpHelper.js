({
    receivePricebooksList: function(component, event){
        console.log('helper');
        let action = component.get('c.getPricebooksList');
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let pricebooks = response.getReturnValue();
                console.log('pricebooks: '+pricebooks);
                component.set('v.pricebooks', pricebooks);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})