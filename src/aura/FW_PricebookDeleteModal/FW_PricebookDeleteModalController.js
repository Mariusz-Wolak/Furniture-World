({
    closeModal: function(component, event, helper){
        component.set('v.showPricebookDeleteModal', false);
    },

    deletePricebook: function(component, event, helper){
        helper.deletePricebook(component, event);
    }
})