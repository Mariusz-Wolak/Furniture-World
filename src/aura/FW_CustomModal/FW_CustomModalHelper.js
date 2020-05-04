({




    doSendComplaint: function(component, event){
        let subject = component.get('v.caseSubject');
        let description = component.get('v.caseDescription');
        let orderId = component.get('v.order.Id');
        let productId = component.find('selectItemToComplaint').get('v.value');
        let action = component.get('c.insertCase');
        action.setParams({
           "subject": subject,
           "description": description,
           "orderId": orderId,
           "productId": productId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.showComplaintsModal', false);
                component.find('customToast').showSuccessToast($A.get("$Label.c.Your_Complaint_Has_Been_Successfully_Sent"));
                window.open($A.get('$Label.c.FW_Welcome_Page_URL'), '_top');
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})