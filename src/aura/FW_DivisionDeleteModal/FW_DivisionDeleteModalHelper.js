({
    deleteDivision: function(component){
        let action = component.get("c.deleteSelectedDivision");
        let id = component.get("v.divisionId");
        action.setParams({"id": id});
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                    let title = $A.get("$Label.c.Success");
                    let message = $A.get("$Label.c.Success_Deleting_Record");
                    let toastComponent = component.find('customToast');
                    toastComponent.showToast(title, message, 'success', 'sticky');
                    component.set("v.deleteDivisionIsOpen", false);

                    let sendAccountEvent = component.getEvent('sendAccount');
                    sendAccountEvent.setParams({
                        "record": null
                    });
                    sendAccountEvent.fire();

                    let divisionsList = component.get('v.divisionsList');
                    for(let i=0; i<divisionsList.length; i++){
                        if(divisionsList[i].Id === id){
                            divisionsList.splice(i, 1);
                            break;
                        }
                    }

                    let appEvent = $A.get("e.c:FW_SendResultsToResultList");
                    appEvent.setParams({"results": divisionsList});
                    appEvent.fire();
            } else{
                    let title = $A.get("$Label.c.Error");
                    let message = $A.get("$Label.c.Error");
                    let errors = response.getError();
                    if (errors && Array.isArray(errors) && errors.length > 0) {
                        message = errors[0].message;
                    }
                    let toastComponent = component.find('customToast');
                    toastComponent.showToast(title, message, 'error', 'sticky');
                    component.set("v.deleteDivisionIsOpen", false);
            }
        });
        $A.enqueueAction(action);
    },
})