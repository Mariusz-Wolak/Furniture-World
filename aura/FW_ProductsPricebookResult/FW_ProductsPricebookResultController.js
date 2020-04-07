({
    selectPricebook: function(component, event, helper){
        let pricebook = component.get('v.pricebook');
        let appEvent = $A.get('e.c:FW_SelectedPricebook');
        appEvent.setParams({
            "pricebook": pricebook
        });
        appEvent.fire();
    }
})