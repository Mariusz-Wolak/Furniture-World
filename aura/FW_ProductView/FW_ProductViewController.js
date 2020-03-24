({
    doInit: function(component, event, helper){
        helper.checkIfIsObserved(component);
    },

    toggleObserved: function(component, event, helper){
        helper.doToggleObserved(component);
    },

    toggleBasket: function(component, event, helper){
        helper.doToggleBasket(component);
    }
})