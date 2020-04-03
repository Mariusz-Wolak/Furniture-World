({
    onInit: function(component, event, helper){
        helper.receivePricebooksList(component, event);
    },

    receiveSearchResults: function(component, event, helper){
        component.set("v.results", event.getParam("results"));
    },

    receiveNewPricebook: function(component, event, helper){
        let newPricebook = event.getParam("pricebook");
        let pricebooksList = component.get('v.pricebooksList');
        pricebooksList.push(newPricebook);
        component.set('v.pricebooksList', pricebooksList);
    },

    compute: function(component, event, helper){
        let discountType = component.find('discountType').get('v.value');
        let discountValue = component.get('v.discountValue');
        console.log('compute before aura method values: '+discountValue+discountType);
        let singleProductCmp = component.find('singleProduct');
        console.log('singleProductCmp: '+singleProductCmp);
        console.log('singleProductCmp.length: '+singleProductCmp.length);

        for(let i=0; i<singleProductCmp.length; i++){
            singleProductCmp[i].passDiscountValues(discountType, discountValue);
        }
        console.log('compute end values: '+discountValue+discountType);
    },

    getPricebook: function(component, event, helper){
        let pricebooks = component.get('v.pricebooksList');
        let selectedPricebookId = component.find('pricebooksSelect').get('v.value');
        let startDate;
        let endDate;

        for(let i=0; i<pricebooks.length; i++){
            if(pricebooks[i].Id == selectedPricebookId){
                component.set('v.pricebookStartDate', pricebooks[i].StartDate__c);
                component.set('v.pricebookEndDate', pricebooks[i].EndDate__c);
                startDate = pricebooks[i].StartDate__c;
                endDate = pricebooks[i].EndDate__c;
            }
        }
        console.log(selectedPricebookId);
        console.log(startDate);
        console.log(endDate);
    }
})