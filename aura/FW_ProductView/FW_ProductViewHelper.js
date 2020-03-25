({
    checkIfIsObserved: function(component, event, helper){
        let productId = component.get('v.product.Id');
        let observeIcon = component.find('observeIcon');
        let action = component.get('c.checkIfProductIsObserved');
        action.setParams({
           "productId": productId
        });
        action.setCallback(this, function(response){
            if(response.getReturnValue() == true){
                $A.util.removeClass(observeIcon, 'greyIcon');
                $A.util.addClass(observeIcon, 'highlightedIcon');
            }
        });
        $A.enqueueAction(action);
    },

    doToggleObserved: function(component, event, helper){
        let observedProductsManager = component.find('observedProductsManager');
        let observeIcon = component.find('observeIcon');
        let productId = component.get('v.product.Id');
        let isAddingToObserved;

        if($A.util.hasClass(observeIcon, 'greyIcon')){
            isAddingToObserved = true;
        }else{
            isAddingToObserved = false;
        }
        observedProductsManager.toggle(isAddingToObserved, productId);
    },

    doToggleBasket: function(component, event, helper){
        let basketIcon = component.find('basketIcon');

        if($A.util.hasClass(basketIcon, 'greyIcon')){
            $A.util.removeClass(basketIcon, 'greyIcon');
            $A.util.addClass(basketIcon, 'highlightedIcon');
        }else{
            $A.util.removeClass(basketIcon, 'highlightedIcon');
            $A.util.addClass(basketIcon, 'greyIcon');
        }
    }
})