({
    closeModal: function(component, event, helper){
        component.set('v.showAddAllModal', false);
    },

    moveAllToPricebook: function(component, event, helper){
        let results = component.get('v.results');
        let sendSearchResultsEvent = $A.get('e.c:FW_SendAllSearchResultsToPricebook');
        sendSearchResultsEvent.setParams({
            "results": results
        });
        sendSearchResultsEvent.fire();
        component.set('v.showAddAllModal', false);
        component.find('customToast').showSuccessToast($A.get('$Label.c.Results_Have_Been_Successfully_Moved_To_The_Pricebook'));
    }
})