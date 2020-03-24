({
    doInit: function(component, event, helper){
        helper.returnNewestProducts(component);
    },

    toggleObserved: function(component, event, helper){
        let observeIcon = component.find('observeIcon');
        let productId = component.get('v.product.Id');
        let toastComponent = component.find('customToast');
        let toastTitle;
        let toastMsg;

        if($A.util.hasClass(observeIcon, 'greyIcon')){
            let action = component.get('c.insertToObserved');
            action.setParams({
                "productId": productId
            });
            $A.util.removeClass(observeIcon, 'greyIcon');
            $A.util.addClass(observeIcon, 'highlightedIcon');
            $A.enqueueAction(action);
        }else{
            $A.util.removeClass(observeIcon, 'highlightedIcon');
            $A.util.addClass(observeIcon, 'greyIcon');
        }
    },

    toggleBasket: function(component, event, helper){
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