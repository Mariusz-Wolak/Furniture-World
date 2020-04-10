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
        component.find('customToast').showSuccessToast('Results have been successfully moved to the price book');
    }
})