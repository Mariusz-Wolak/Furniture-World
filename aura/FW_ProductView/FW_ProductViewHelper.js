({
    returnNewestProducts: function(component, event, helper){
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
    }
})