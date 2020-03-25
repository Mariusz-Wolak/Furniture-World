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
    }
})