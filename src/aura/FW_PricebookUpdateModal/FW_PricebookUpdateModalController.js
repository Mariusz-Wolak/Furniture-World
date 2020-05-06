({
    closeModal: function(component, event, helper){
        component.set('v.showPricebookDetailsModal', false);
    },

    editPricebook: function(component, event, helper){
        helper.editPricebook(component, event);
    }
})