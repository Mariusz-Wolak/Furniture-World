({
    doToggleObserved: function(component){
        let observedProductsManager = component.find('observedProductsManager');
        let observeIcon = component.find('observeIcon');
        let productId = component.get('v.item.id');
        let isAddingToObserved;

        if($A.util.hasClass(observeIcon, 'greyIcon')){
            isAddingToObserved = true;
        }else{
            isAddingToObserved = false;
        }
        observedProductsManager.toggle(isAddingToObserved, productId);
    },

    checkIfIsObserved: function(component, event, helper){
        let productId = component.get('v.item.id');
        let observeIcon = component.find('observeIcon');
        let action = component.get('c.checkIfProductIsObserved');
        action.setParams({
           "productId": productId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                if(response.getReturnValue() == true){
                    $A.util.removeClass(observeIcon, 'greyIcon');
                    $A.util.addClass(observeIcon, 'highlightedIcon');
                }
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }

        });
        $A.enqueueAction(action);
    },

     returnSimilarProducts: function(component){
        let productFamily = component.get('v.item.family');
        let productId = component.get('v.item.id');
        let action = component.get('c.getSimilarProducts');
        action.setParams({
            "productFamily": productFamily,
            "productId": productId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let appEvent = $A.get("e.c:FW_SendSimilarProducts");
                appEvent.setParams({
                    "products": response.getReturnValue()
                });
                appEvent.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})