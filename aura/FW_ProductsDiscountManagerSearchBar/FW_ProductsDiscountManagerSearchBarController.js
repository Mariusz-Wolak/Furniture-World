({
    search: function(component, event, helper){
        if(event.which == 13){
            helper.doSearch(component);
        }
    },

//    refreshResults: function(component, event, helper){
//        helper.doSearch(component);
//    },

    setPricebook: function(component, event, helper){
        component.set('v.pricebook', event.getParam('pricebook'));
    },

    receiveProductsFromPricebook: function(component, event, helper){
        let productsFromPricebook = event.getParam('products');
        let results = component.get('v.results');
        for(let i=0; i<productsFromPricebook.length; i++){
            for(let j=0; j<results.length; j++){
                if(results[j].id == productsFromPricebook[i].id){
                    results.splice(j,1);
                    break;
                }
            }
        }
        component.set('v.productsFromPricebook', productsFromPricebook);
        component.set('v.results', results);
    },

    removeSentProduct: function(component, event, helper){
        let product = event.getParam('product');
        let results = component.get('v.results');
        for(let i=0; i<results.length; i++){
            if(results[i].id == product.id){
                results.splice(i, 1);
                break;
            }
        }
        component.set('v.results', results);
    },

    receiveRemovedProductFromPricebook: function(component, event, helper){
        console.log('receive removed product');
        let product = event.getParam('product');
        let results = component.get('v.results');
        if(results == null){
            console.log('results null');
            results = [];
        }else{
            console.log('results not null');
        }
        results.unshift(product);
        component.set('v.results', results);
        console.log('results in search bar: '+JSON.stringify(results));
    },

    receiveDeletedPricebook: function(component, event, helper){
        let deletedPricebook = event.getParam('pricebook');
        let selectedPricebook = component.get('v.pricebook');
        if(selectedPricebook.Id == deletedPricebook.Id){
            component.set('v.pricebook', null);
        }
    },

    openAddAllModal: function(component, event, helper){
        component.set('v.showAddAllModal', true);
    },

    clearResults: function(component, event, helper){
        component.set('v.results', null);
    },

    handleClearedProducts: function(component, event, helper){
        console.log('receive removed list from PB');
        let products = event.getParam('products');
        let results = component.get('v.results');

        let resultsToShow = products.concat(results);
        component.set('v.results', resultsToShow)
    }
})