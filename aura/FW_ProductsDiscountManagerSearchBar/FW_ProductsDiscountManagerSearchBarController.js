({
    search: function(component, event, helper){
        if(event.which == 13){
            helper.doSearch(component);
        }
    },

    refreshResults: function(component, event, helper){
        helper.doSearch(component);
    },

    setPricebook: function(component, event, helper){
        component.set('v.pricebook', event.getParam('pricebook'));
    },

    receiveProductsFromPricebook: function(component, event, helper){
        let productsFromPricebook = event.getParam('products');
        let results = component.get('v.results');
        let idsToRemove = [];
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
})