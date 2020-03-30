({
    returnOrders: function(component, event){
        let action = component.get('c.getOrders');
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.results', response.getReturnValue());
                window.open('https://fw-community-developer-edition.eu32.force.com/furnitureworldcommunity/s/Orders', '_top');
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})