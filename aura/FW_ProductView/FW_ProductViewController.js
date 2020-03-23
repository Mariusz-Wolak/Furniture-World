({
    toggleObserved: function(component, event, helper){
        let observeIcon = component.find('observeIcon');

        if($A.util.hasClass(observeIcon, 'greyIcon')){
            $A.util.removeClass(observeIcon, 'greyIcon');
            $A.util.addClass(observeIcon, 'highlightedIcon');

//            let title = $A.get("$Label.c.Success");
//            let message = $A.get("$Label.c.Unknown_Error");
//            let toastComponent = component.find('customToast');
//            toastComponent.ShowToast('title', 'message', 'success', 'sticky');
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