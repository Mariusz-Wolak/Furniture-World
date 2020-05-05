({
    closeModal: function(component, event, helper){
        component.set('v.showDeleteProductModal', false);
    },

    removeProduct: function(component, event, helper){
        helper.removeProduct(component, event);
    }
})