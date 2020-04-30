({
    doAddPricebook: function(component, event){
        let action = component.get('c.insertPricebook');
        action.setParams({
            "name": component.get('v.name'),
            "startDate": component.get('v.startDate'),
            "endDate": component.get('v.endDate')
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.find('customToast').showSuccessToast($A.get("$Label.c.Pricebook_Has_Been_Added_Successfully"));
                let newPricebook = response.getReturnValue();
                let sendPricebookEvent = $A.get('e.c:FW_ProductsDiscountManagerNewPricebook');
                sendPricebookEvent.setParams({
                    "pricebook": newPricebook
                });
                sendPricebookEvent.fire();
                component.set('v.showModal', false);
                component.set('v.name', null);
                component.set('v.startDate', null);
                component.set('v.endDate', null);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})