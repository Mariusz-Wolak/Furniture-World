({
    doToggleObserved: function(component, event, helper){
        let params = event.getParam('arguments');
        let adding = params.adding;
        let productId = params.productId;

        if(adding){
            let action = component.get('c.insertToObserved');
            action.setParams({
                "productId": productId
            });
            action.setCallback(this, function(response){
                let state = response.getState();
                if(state === 'SUCCESS'){
                    let cmpEvent = component.getEvent('observedProductsManagerEvent');
                    cmpEvent.setParams({
                       response: 'successAdding'
                    });
                    cmpEvent.fire();
                }else{
                    component.find('customToast').showErrorToast(response.getError());
                }
            });
            $A.enqueueAction(action);
        }else{
            let action = component.get('c.removeFromObserved');
            action.setParams({
                "productId": productId
            });
            action.setCallback(this, function(response){
                let state = response.getState();
                if(state === 'SUCCESS'){
                    let cmpEvent = component.getEvent('observedProductsManagerEvent');
                    cmpEvent.setParams({
                       response: 'successRemoving'
                    });
                    cmpEvent.fire();
                }else{
                     component.find('customToast').showErrorToast(response.getError());
                 }
             });
            $A.enqueueAction(action);
        }
    }
})