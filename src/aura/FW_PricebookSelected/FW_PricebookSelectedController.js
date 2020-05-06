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

        if(singleProductCmp.length == undefined){
            singleProductCmp.passDiscountValues(discountType, discountValue);
        }else{
            for(let i=0; i<singleProductCmp.length; i++){
                singleProductCmp[i].passDiscountValues(discountType, discountValue);
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

    setDiscount: function(component, event, helper){
        let singleProductCmp = component.find('singleProduct');
        if(singleProductCmp.length == undefined){
            singleProductCmp.passSelectedProducts();
        }else{
            for(let i=0; i<singleProductCmp.length; i++){
                singleProductCmp[i].passSelectedProducts();
            }
        }
    },

    receiveProductToDiscount: function(component, event, helper){
        let isError = false;
        let productToDiscount = event.getParam('productToDiscount');
        let productsToDiscountList = component.get('v.productsToDiscountList');
        productsToDiscountList.push(productToDiscount);
        if(productsToDiscountList.length == component.get('v.resultsFromSelectedPricebook').length){
            let discountPriceMapped = new Map();

            for(let i=0; i<productsToDiscountList.length; i++){
                if(productsToDiscountList[i].isError){
                    isError = true;
                    break;
                }
                    discountPriceMapped[productsToDiscountList[i].product.id] = productsToDiscountList[i].priceAfterDiscount;
            }
            if(!isError){
                let pricebookId = component.get('v.selectedPricebook').Id;
                helper.insertNewDiscount(component, discountPriceMapped, pricebookId);
            }
            productsToDiscountList = [];
            component.set('v.productsToDiscountList', productsToDiscountList);
            component.set('v.discountValue', null);
        }
    },

    selectPricebook: function(component, event, helper){
        let pricebook = event.getParam('pricebook');
        component.set('v.selectedPricebook', pricebook);

        if(pricebook.Name === 'Standard Price Book'){
            component.set('v.isStandardPB', true);
        }else{
            component.set('v.isStandardPB', false);
        }
        component.set('v.searchItemName', '');
        helper.receiveProductsFromPricebook(component, event);
    },

    addProductToPricebookList: function(component, event, helper){
        let product = event.getParam('product');
        let resultsFromPricebook = component.get('v.resultsFromSelectedPricebook');
        if(resultsFromPricebook == null){
            resultsFromPricebook = [];
        }
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
        component.find('customToast').showSuccessToast($A.get('$Label.c.Product_Has_Been_Removed_From_Pricebook_Successfully'));
    },

    addSearchResultsToPricebook: function(component, event, helper){
        let resultsFromSearch = event.getParam('results');
        for(let i=0; i<resultsFromSearch.length; i++){
            resultsFromSearch[i].discountPrice = null;
        }
        let currentResults = component.get('v.resultsFromSelectedPricebook');
        let resultsToShow = resultsFromSearch.concat(currentResults);
        component.set('v.resultsFromSelectedPricebook', resultsToShow)
    },

    clearPricebook: function(component, event, helper){
        component.set('v.showPricebookClearModal', true);
    },

    handleClearedProducts: function(component, event, helper){
        component.set('v.resultsFromSelectedPricebook', null);
    },

    search: function(component, event, helper){
        if(event.which == 13){
            helper.search(component);
        }
    }
})