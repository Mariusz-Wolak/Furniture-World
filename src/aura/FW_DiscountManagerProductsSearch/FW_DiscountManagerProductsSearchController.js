({
    search: function(component, event, helper){
        if(event.which == 13){
            helper.search(component);
        }
    },

    setPricebook: function(component, event, helper){
        component.set('v.pricebook', event.getParam('pricebook'));
        component.set('v.results', null);
    },

    receiveProductsFromPricebook: function(component, event, helper){
        let productsFromPricebook = event.getParam('products');
        component.set('v.productsFromPricebook', productsFromPricebook);

        let results = component.get('v.results');
        if(results != null){
            for(let i=0; i<productsFromPricebook.length; i++){
                for(let j=0; j<results.length; j++){
                    if(results[j].id == productsFromPricebook[i].id){
                        results.splice(j,1);
                        break;
                    }
                }
            }
            component.set('v.results', results);
        }
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
        let product = event.getParam('product');
        let results = component.get('v.results');
        let productsFromPricebook = component.get('v.productsFromPricebook');
        if(results == null){
            results = [];
        }else{
            results.unshift(product);
        }
        if(productsFromPricebook == null){
            productsFromPricebook = [];
        }else{
            productsFromPricebook.unshift(product);
        }
        component.set('v.results', results);
        component.set('v.productsFromPricebook', productsFromPricebook);
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
        let products = event.getParam('products');
        let results = component.get('v.results');

        if(results != null){
            let resultsToShow = products.concat(results);
            component.set('v.results', resultsToShow)
        }else{
            component.set('v.results', products);
        }
    }
})