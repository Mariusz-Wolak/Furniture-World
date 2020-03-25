({
    doInit: function(component, event, helper){
        helper.checkIfIsObserved(component);
    },

    toggleObserved: function(component, event, helper){
        helper.doToggleObserved(component);
    },

    toggleBasket: function(component, event, helper){
        helper.doToggleBasket(component);
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