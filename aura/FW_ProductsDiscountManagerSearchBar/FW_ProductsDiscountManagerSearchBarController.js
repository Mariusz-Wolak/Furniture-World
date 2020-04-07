({
    search: function(component, event, helper){
        if(event.which == 13){
            helper.doSearch(component);
        }
    },

    refreshResults: function(component, event, helper){
        helper.doSearch(component);
    },

    setPricebook: function(component, event, helper){
        component.set('v.pricebook', event.getParam('pricebook'));
    }
})