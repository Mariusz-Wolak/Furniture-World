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
        console.log('rate in doAddComent: '+rate);
        let productId = component.get('v.product.Id');
        let commentText = component.get('v.commentText');
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
                console.log('response success in return newest comments: '+JSON.stringify(response.getReturnValue()));
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})