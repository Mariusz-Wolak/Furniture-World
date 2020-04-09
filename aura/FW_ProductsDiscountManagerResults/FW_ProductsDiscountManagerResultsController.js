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

    updatePricebook: function(component, event, helper){
        let updatedPricebook = event.getParam('pricebook');
        let pricebooksList = component.get('v.pricebooksList');
        for(let i=0; i<pricebooksList.length; i++){
            if(pricebooksList[i].Id == updatedPricebook.Id){
                pricebooksList.splice(i, 1);
                break;
            }
        }
        pricebooksList.unshift(updatedPricebook);
        component.set('v.pricebooksList', pricebooksList);

        let selectedPricebook = component.get('v.selectedPricebook');
        if(selectedPricebook.Id == updatedPricebook.Id){
            component.set('v.selectedPricebook', updatedPricebook);
        }
    },

    receiveDeletedPricebook: function(component, event, helper){
        let deletedPricebook = event.getParam('pricebook');
        let selectedPricebook = component.get('v.selectedPricebook');
        if(selectedPricebook.Id == deletedPricebook.Id){
            component.set('v.selectedPricebook', null);
        }
    },

    compute: function(component, event, helper){
        let discountType = component.find('discountType').get('v.value');
        let discountValue = component.get('v.discountValue');
        let singleProductCmp = component.find('singleProduct');

        console.log('length: '+singleProductCmp.length);
        if(singleProductCmp.length == undefined){
            console.log('undefined');
            singleProductCmp.passDiscountValues(discountType, discountValue);
        }else{
            for(let i=0; i<singleProductCmp.length; i++){
                console.log(singleProductCmp.length);
                singleProductCmp[i].passDiscountValues(discountType, discountValue);
                console.log(singleProductCmp[i]);
            }
        }
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
                break;
            }
        }
    },

    selectAll: function(component, event, helper){
        let checkboxVal = component.find('selectAllCheckbox').get('v.value');
        let selectAllEvent = $A.get('e.c:FW_ProductsDiscountManagerSelectAllEvent');
        selectAllEvent.setParams({
            "selectAll": checkboxVal
        });
        selectAllEvent.fire();
    },

    setDiscount: function(component, event, helper){
        console.log('set prices clicked');
        let singleProductCmp = component.find('singleProduct');
        console.log('after getting singleProductCmp');
        console.log('singleProductCmp: '+singleProductCmp);
        for(let i=0; i<singleProductCmp.length; i++){
            console.log(i);
            console.log('singleProductCmp passSelectedProducts');
            singleProductCmp[i].passSelectedProducts();
        }
    },

    receiveProductToDiscount: function(component, event, helper){
        console.log('receive ProductToDiscount');
        let isError = false;
        let productToDiscount = event.getParam('productToDiscount');
        let productsToDiscountList = component.get('v.productsToDiscountList');
        productsToDiscountList.push(productToDiscount);
        console.log('przed sprawdzeniem length');
        console.log('productsToDiscountList.length: '+productsToDiscountList.length);
        console.log('cmp get results length: '+component.get('v.resultsFromSelectedPricebook').length);
        if(productsToDiscountList.length == component.get('v.resultsFromSelectedPricebook').length){
            console.log('length sie zgadza, teraz mapping');
            let discountPriceMapped = new Map();
            let standardPriceMapped = new Map();
            let standardPricebookId = component.get('v.standardPricebookId');

            for(let i=0; i<productsToDiscountList.length; i++){
                if(productsToDiscountList[i].isError){
                    isError = true;
                    break;
                }
                if(productsToDiscountList[i].isSelected){
                    discountPriceMapped[productsToDiscountList[i].product.id] = productsToDiscountList[i].priceAfterDiscount;
                    standardPriceMapped[productsToDiscountList[i].product.id] = productsToDiscountList[i].product.price;
                }
            }
            if(!isError){
                console.log('nie ma errora');
//                let pricebookId = component.find('pricebooksSelect').get('v.value');
                let pricebookId = component.get('v.selectedPricebook').Id;
                console.log('pricebookId before insert discount: '+pricebookId);
                helper.insertNewDiscount(component, standardPriceMapped, discountPriceMapped, standardPricebookId, pricebookId);
            }
            productsToDiscountList = [];
            component.set('v.productsToDiscountList', productsToDiscountList);
        }
    },

    selectPricebook: function(component, event, helper){
        let pricebook = event.getParam('pricebook');
        component.set('v.selectedPricebook', pricebook);
        helper.receiveProductsFromPricebook(component, pricebook);
    },

    addProductToPricebookList: function(component, event, helper){
        let product = event.getParam('product');
        let resultsFromPricebook = component.get('v.resultsFromSelectedPricebook');
        resultsFromPricebook.unshift(product);
        component.set('v.resultsFromSelectedPricebook', resultsFromPricebook);
        console.log(component.get('v.resultsFromSelectedPricebook'));
    },

    removeProductFromPricebook: function(component, event, helper){
        let product = event.getParam('product');
        let resultsFromPricebook = component.get('v.resultsFromSelectedPricebook');
        for(let i=0; i<resultsFromPricebook.length; i++){
            if(resultsFromPricebook[i].id == product.id){
                resultsFromPricebook.splice(i, 1);
                break;
            }
        }
        component.set('v.resultsFromSelectedPricebook', resultsFromPricebook);
    }
})