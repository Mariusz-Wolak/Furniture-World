({
    doInit: function(component, event, helper){
        let productId = component.get('v.product.Id');
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
                let toastComponent = component.find('customToast');
                toastTitle = $A.get("$Label.c.Error");
                toastMsg = $A.get("$Label.c.Unknown_Error");
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    toastMsg = errors[0].message;
                }
                toastComponent.ShowToast(toastTitle, toastMsg, 'error', 'sticky');
            }
        });
        $A.enqueueAction(action);
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
            action.setCallback(this, function(response){
                let state = response.getState();
                if(state === 'SUCCESS'){
                    $A.util.removeClass(observeIcon, 'greyIcon');
                    $A.util.addClass(observeIcon, 'highlightedIcon');
                    toastTitle = $A.get("$Label.c.Success");
                    toastMsg = $A.get("$Label.c.Success_Adding_Item");
                }else{
                    toastTitle = $A.get("$Label.c.Error");
                    toastMsg = $A.get("$Label.c.Unknown_Error");
                    let errors = response.getError();
                    if (errors && Array.isArray(errors) && errors.length > 0) {
                        toastMsg = errors[0].message;
                    }
                }
            });
            $A.enqueueAction(action);
        }else{
            $A.util.removeClass(observeIcon, 'highlightedIcon');
            $A.util.addClass(observeIcon, 'greyIcon');
        }
            toastComponent.ShowToast(toastTitle, toastMsg, 'success', 'sticky');
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