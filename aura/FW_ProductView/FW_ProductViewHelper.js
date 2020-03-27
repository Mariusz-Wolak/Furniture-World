({
    checkIfIsObserved: function(component, event){
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
                component.find('customToast').showErrorToast(response.getError());
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

    doAddToBasket: function(component, event){
        let basketIcon = component.find('basketIcon');
        let productId = component.get('v.product.Id');

        let action = component.get('c.insertToBasket');
        action.setParams({
           "productId":  productId
        });

        console.log('before set callback');
        action.setCallback(this, function(response){
            console.log('action set callback');
            let state = response.getState();
            if(state === 'SUCCESS'){
                console.log('state success');
                component.find('customToast').showSuccessToast('success return from inserting to basket');
                console.log('add cache response: '+response.getReturnValue());
            }else{
                console.log('error toast');
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
        console.log('adding to basket end');
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
                    component.find('customToast').showSuccessToast($A.get('$Label.c.Your_Comment_Has_Been_Added_Successfully'));
                    let commentsList = component.get('v.commentsList');
                    component.set('v.commentText', null);
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
    },

    returnSimilarProducts: function(component){
        let productFamily = component.get('v.product.Family');
        let productId = component.get('v.product.Id');
        let action = component.get('c.getSimilarProducts');
        action.setParams({
            "productFamily": productFamily,
            "productId": productId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.results', response.getReturnValue());
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})