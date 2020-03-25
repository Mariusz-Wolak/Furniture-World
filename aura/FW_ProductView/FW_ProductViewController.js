({
    doInit: function(component, event, helper){
        helper.checkIfIsObserved(component);
        helper.returnNewestComments(component);
    },

    toggleObserved: function(component, event, helper){
        helper.doToggleObserved(component);
    },

    toggleBasket: function(component, event, helper){
        helper.doToggleBasket(component);
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
    }
})