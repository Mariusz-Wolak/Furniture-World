({
    doInit: function(component, event, helper){
        component.set('v.header', $A.get('$Label.c.Similar_Items'));
        component.set('v.isCommunity', true);
        component.set('v.productId', component.get('v.product.id'));
        component.set('v.quantity', 1);
        helper.checkIfIsObserved(component);
        helper.returnNewestComments(component);
        helper.returnSimilarProducts(component);
    },

    toggleObserved: function(component, event, helper){
        helper.doToggleObserved(component);
    },

    addToBasket: function(component, event, helper){
        helper.doAddToBasket(component);
    },

    addComment: function(component, event, helper){
        helper.doAddComment(component);
    },

    refreshComments: function(component, event, helper){
        helper.returnNewestComments(component)
    },

    rateProduct: function(component, event, helper){
        component.set('v.rating', event.getParam('rating'));
    },

    toggleObserveIcon: function(component, event, helper){
        let response = event.getParam('response');
        let observeIcon = component.find('observeIcon');

        if(response === 'successAdding'){
            $A.util.removeClass(observeIcon, 'greyIcon');
            $A.util.addClass(observeIcon, 'highlightedIcon');
        }
        else if(response === 'successRemoving'){
            $A.util.removeClass(observeIcon, 'highlightedIcon');
            $A.util.addClass(observeIcon, 'greyIcon');
        }
    },

    setSimilarProducts: function(component, event, helper){
        component.set('v.results', event.getParam('products'));
        helper.returnNewestComments(component);
    },

    checkIfIsObserved: function(component, event, helper){
        component.set('v.productId', event.getParam('productId'));
        helper.checkIfIsObserved(component);
    },

    decreaseQuantity: function(component, event, helper){
        let quantityInputValue = component.get('v.quantity');
        if(quantityInputValue > 1){
            let newQuantity = quantityInputValue-1;
            component.set('v.quantity', newQuantity);
        }
    },

    increaseQuantity: function(component, event, helper){
        let quantityInputValue = component.get('v.quantity');
        let newQuantity = Number(quantityInputValue)+1;
        component.set('v.quantity', newQuantity);
    },

    changeQuantity: function(component, event, helper){
        let quantityInputValue = component.get('v.quantity');
        if(quantityInputValue == ''){
            quantityInputValue = 1;
            component.set('v.quantity', quantityInputValue);
        }
    }
})