({
//    doAddPricebook: function(component, event){
//        let action = component.get('c.insertPricebook');
//        action.setParams({
//            "name": component.get('v.name'),
//            "startDate": component.get('v.startDate'),
//            "endDate": component.get('v.endDate')
//        });
//        action.setCallback(this, function(response){
//            let state = response.getState();
//            if(state === 'SUCCESS'){
//                component.find('customToast').showSuccessToast($A.get("$Label.c.Pricebook_Has_Been_Added_Successfully"));
//                let newPricebook = response.getReturnValue();
//                if(newPricebook.IsActive == true){
//                    let sendPricebookEvent = $A.get('e.c:FW_ProductsDiscountManagerNewPricebook');
//                    sendPricebookEvent.setParams({
//                        "pricebook": newPricebook
//                    });
//                    sendPricebookEvent.fire();
//                }
//            }else{
//                component.find('customToast').showErrorToast(response.getError());
//            }
//        });
//        $A.enqueueAction(action);
//    }
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
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})