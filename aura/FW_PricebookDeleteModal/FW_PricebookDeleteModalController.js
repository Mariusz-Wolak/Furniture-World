({
    closeModal: function(component, event, helper){
        component.set('v.showPricebookDeleteModal', false);
    },

    deletePricebook: function(component, event, helper){
        helper.doDeletePricebook(component, event);
    }
})