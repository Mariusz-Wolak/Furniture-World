({
    closeDeleteDivisionModal: function(component, event, helper) {
        component.set("v.deleteDivisionIsOpen", false);
    },

    deleteDivision: function(component, event, helper){
        helper.doDeleteDivision(component);
    }
})