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
        console.log('receiveProductToDiscount');
        let productToDiscount = event.getParam('productToDiscount');
        let productsToDiscountList = component.get('v.productsToDiscountList');
        productsToDiscountList.push(productToDiscount);
        if(productsToDiscountList.length == component.get('v.results').length){
            let discountPriceMapped = new Map();
            let standardPriceMapped = new Map();

            for(let i=0; i<productsToDiscountList.length; i++){
                if(productsToDiscountList[i].isSelected){
                    console.log('productsToDiscountList[i].product: '+JSON.stringify(productsToDiscountList[i].product));
                    console.log('productsToDiscountList[i].product.id: '+JSON.stringify(productsToDiscountList[i].product.id));
                    console.log('productsToDiscountList[i].priceAfterDiscount: '+JSON.stringify(productsToDiscountList[i]
                    .priceAfterDiscount));
                    discountPriceMapped[productsToDiscountList[i].product.id] = productsToDiscountList[i].priceAfterDiscount;
                    standardPriceMapped[productsToDiscountList[i].product.id] = productsToDiscountList[i].price;
                    console.log('discountPriceMapped: '+discountPriceMapped);
                }
            }

            console.log('ok, robimy akcje apexowa, bo mamy wszystkie resulty, a jest ich v3: '+productsToDiscountList.length);
            let pricebookId = component.find('pricebooksSelect').get('v.value');
            helper.insertNewDiscount(component, standardPriceMapped, discountPriceMapped, pricebookId);

            productsToDiscountList = [];
            component.set('v.productsToDiscountList', productsToDiscountList);
        }

    }
})