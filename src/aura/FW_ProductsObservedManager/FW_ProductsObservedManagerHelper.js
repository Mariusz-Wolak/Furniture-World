({
    toggleObserved: function(component, event, helper){
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
                    component.find('customToast').showSuccessToast($A.get('$Label.c.Item_Has_Been_Added_To_Observed_List'));
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
                    component.find('customToast').showSuccessToast($A.get('$Label.c.Item_Has_Been_Removed_From_Observed_List'));
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