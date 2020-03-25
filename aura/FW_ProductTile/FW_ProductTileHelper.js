({
    doToggleObserved: function(component, event, helper){
        let observeIcon = component.find('observeIcon');
        let productId = component.get('v.product.Id');
        let toastComponent = component.find('customToast');

        if($A.util.hasClass(observeIcon, 'greyIcon')){
            let action = component.get('c.insertToObserved');
            action.setParams({
                "productId": productId
            });
            $A.util.removeClass(observeIcon, 'greyIcon');
            $A.util.addClass(observeIcon, 'highlightedIcon');
            $A.enqueueAction(action);
        }else{
            let action = component.get('c.removeFromObserved');
            action.setParams({
                "productId": productId
            });
            $A.util.removeClass(observeIcon, 'highlightedIcon');
            $A.util.addClass(observeIcon, 'greyIcon');
            $A.enqueueAction(action);
        }
    },
})