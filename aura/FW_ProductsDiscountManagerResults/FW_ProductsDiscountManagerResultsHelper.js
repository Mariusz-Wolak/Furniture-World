({
    receivePricebooksList: function(component, event){
        let action = component.get('c.getPricebooksList');
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                let pricebooksList = response.getReturnValue();
                console.log('response pricebooks: '+JSON.stringify(response.getReturnValue()));
                console.log('pricebooksList.length: '+JSON.stringify(pricebooksList.length));
                for(let i=0; i<pricebooksList.length; i++){
                    console.log(pricebooksList[i].Name);
                    console.log(pricebooksList[i].Id);
                    if(pricebooksList[i].Name == 'Standard'){
                        console.log('mamy standard');
                        component.set('v.standardPricebookId', pricebooksList[i].Id);
                        pricebooksList.splice(i, 1);
                        break;
                    }
                }
                component.set('v.pricebooksList', pricebooksList);
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
        console.log('action params: '+JSON.stringify(action.getParams()));
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.find('customToast').showSuccessToast($A.get("$Label.c.Discount_Has_Been_Set_Successfully"));
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})