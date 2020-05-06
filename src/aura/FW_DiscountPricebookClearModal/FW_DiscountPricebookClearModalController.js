({
    closeModal: function(component, event, helper){
        component.set('v.showPricebookClearModal', false);
    },

    clearPricebook: function(component, event, helper){
        helper.clearPricebook(component, event);
    }
})