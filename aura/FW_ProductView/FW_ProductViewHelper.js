({
    checkIfIsObserved: function(component, event){
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

    doToggleObserved: function(component, event){
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

    doToggleBasket: function(component, event){
        let basketIcon = component.find('basketIcon');

        if($A.util.hasClass(basketIcon, 'greyIcon')){
            $A.util.removeClass(basketIcon, 'greyIcon');
            $A.util.addClass(basketIcon, 'highlightedIcon');
        }else{
            $A.util.removeClass(basketIcon, 'highlightedIcon');
            $A.util.addClass(basketIcon, 'greyIcon');
        }
    },

    doAddComment: function(component, event){
        let rate = component.get('v.rating');
        let commentText = component.get('v.commentText');
        if(rate == undefined){
            component.find('customToast').showErrorToast($A.get('$Label.c.Please_Rate_The_Item_First'));
        }else if(commentText == undefined || commentText.length < 10){
            component.find('customToast').showErrorToast('10 '+$A.get('$Label.c.Characters_Required'));
        }else{
            let productId = component.get('v.product.Id');
            let action = component.get('c.insertComment');
            action.setParams({
               "productId": productId,
               "commentText": commentText,
               "rate": rate
            });
            action.setCallback(this, function(response){
                let state = response.getState();
                if(state === 'SUCCESS'){
                    let commentsList = component.get('v.commentsList');
                    component.set('v.commentText', null);
                    $A.enqueueAction(component.get('c.refreshComments'));
                }else{
                    component.find('customToast').showErrorToast(response.getError());
                }
            });
            $A.enqueueAction(action);
        }
    },

    returnNewestComments: function(component){
        let productId = component.get('v.product.Id');
        let commentsList = component.get("v.commentsList");
        let action = component.get("c.getNewestComments");
        action.setParams({
           "productId": productId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.commentsList', response.getReturnValue());
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})