({
    doDeleteDivision: function(component){
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

    doOrder: function(component, event, helper){
        let currentUser = component.get('v.currentUser');
        let productsInBasket = component.get('v.productsInBasket');
        let totalPrice = component.get('v.totalPrice');
        let action = component.get('c.insertOrder');
        action.setParams({
           "currentUser": currentUser,
           "productsInBasket": productsInBasket,
           "totalPrice": totalPrice
        });
        console.log('insertOrder params: '+JSON.stringify(action.getParams()));
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.find('customToast').showSuccessToast($A.get("$Label.c.Your_Order_Has_Been_Successfully_Processed"));
                component.set('v.showProceedBasketModal', false);
                this.clearBasket(component, event);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    },

    clearBasket: function(component, event){
        let action = component.get('c.deleteBasket');
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.showOrderSummary', true);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    },

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
                window.open('https://fw-community-developer-edition.eu32.force.com/furnitureworldcommunity/s/', '_top');
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})