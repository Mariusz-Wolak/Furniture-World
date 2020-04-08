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
        let singleProductCmp = component.find('singleProduct');

        for(let i=0; i<singleProductCmp.length; i++){
            singleProductCmp[i].passDiscountValues(discountType, discountValue);
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
        let singleProductCmp = component.find('singleProduct');
        for(let i=0; i<singleProductCmp.length; i++){
            singleProductCmp[i].passSelectedProducts();
        }
    },

    receiveProductToDiscount: function(component, event, helper){
        let isError = false;
        let productToDiscount = event.getParam('productToDiscount');
        let productsToDiscountList = component.get('v.productsToDiscountList');
        productsToDiscountList.push(productToDiscount);
        if(productsToDiscountList.length == component.get('v.results').length){
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
                let pricebookId = component.find('pricebooksSelect').get('v.value');
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