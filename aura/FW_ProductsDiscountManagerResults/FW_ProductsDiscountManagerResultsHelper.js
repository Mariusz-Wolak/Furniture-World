({
    receivePricebooksList: function(component, event){
        let action = component.get('c.getPricebooksList');
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let pricebooksList = response.getReturnValue();
                for(let i=0; i<pricebooksList.length; i++){
                    if(pricebooksList[i].Name == 'Standard'){
                        component.set('v.standardPricebookId', pricebooksList[i].Id);
                        pricebooksList.splice(i, 1);
                        break;
                    }
                }
                component.set('v.pricebooksList', pricebooksList);
                component.set('v.pricebookEndDate', pricebooksList[0].StartDate__c);
                component.set('v.pricebookStartDate', pricebooksList[0].EndDate__c);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    },

    insertNewDiscount: function(component, standardPriceMapped, discountPriceMapped, standardPricebookId, pricebookId){
        let action = component.get('c.insertDiscount');
        action.setParams({
            "standardPriceMapped": standardPriceMapped,
            "discountPriceMapped": discountPriceMapped,
            "standardPricebookId": standardPricebookId,
            "pricebookId": pricebookId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.find('customToast').showSuccessToast($A.get("$Label.c.Prices_Saved_Successfully"));
                component.find('searchBar').search();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    },

    receiveProductsFromPricebook: function(component, pricebook){
        let action = component.get('c.getProductsFromPricebook');
        action.setParams({
            "pricebookId": pricebook.Id
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.resultsFromSelectedPricebook', response.getReturnValue());
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})