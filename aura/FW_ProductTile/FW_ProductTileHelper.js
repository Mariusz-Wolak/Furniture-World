({
    doToggleObserved: function(component){
        let observedProductsManager = component.find('observedProductsManager');
        let observeIcon = component.find('observeIcon');
        let productId = component.get('v.item.Id');
        let isAddingToObserved;

        if($A.util.hasClass(observeIcon, 'greyIcon')){
            isAddingToObserved = true;
        }else{
            isAddingToObserved = false;
        }
        observedProductsManager.toggle(isAddingToObserved, productId);
    },

    checkIfIsObserved: function(component, event, helper){
        let productId = component.get('v.item.Id');
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
    }
})