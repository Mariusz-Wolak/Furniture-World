({
    doDelete: function(component){
        let action = component.get("c.deleteDivision");
        let id = component.get("v.record.Id");
        action.setParams({"id": id});
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                    let title = $A.get("$Label.c.Success");
                    let message = $A.get("$Label.c.Success_Deleting_Record");
                    let toastComponent = component.find('customToast');
                    toastComponent.ShowToast(title, message, 'success', 'sticky');

                    component.set("v.deleteIsOpen", false);
                    component.set("v.record", null);
                    let appEvent = $A.get("e.c:FW_SendResultsToResultList");
                    appEvent.setParams({"results": []});
                    appEvent.fire();

            } else{
                    let title = $A.get("$Label.c.Error");
                    let message = $A.get("$Label.c.Error");
                    let errors = response.getError();
                    if (errors && Array.isArray(errors) && errors.length > 0) {
                        message = errors[0].message;
                    }
                    let toastComponent = component.find('customToast');
                    toastComponent.ShowToast(title, message, 'error', 'sticky');
                    component.set("v.deleteIsOpen", false);
            }
        });
        $A.enqueueAction(action);
    }
})