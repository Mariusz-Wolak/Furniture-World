
({
    closeModal: function(component, event, helper){
        component.set('v.showPricebookDetailsModal', false);
    },

    editPricebook: function(component, event, helper){
        helper.doEditPricebook(component, event);
    }
})