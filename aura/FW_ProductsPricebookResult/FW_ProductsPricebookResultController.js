({
    selectPricebook: function(component, event, helper){
        let pricebook = component.get('v.pricebook');
        let appEvent = $A.get('e.c:FW_SelectedPricebook');
        appEvent.setParams({
            "pricebook": pricebook
        });
        appEvent.fire();
    },

    showPricebookDeleteModal: function(component, event, helper){
        component.set('v.showPricebookDeleteModal', true);
    },

    showPricebookDetailsModal: function(component, event, helper){
         component.set('v.showPricebookDetailsModal', true);
     }
})