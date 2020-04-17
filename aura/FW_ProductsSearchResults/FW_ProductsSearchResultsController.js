({
    onInit: function(component, event, helper){
        let meta = document.createElement("meta");
        meta.setAttribute("name", "format-detection");
        meta.setAttribute("http-equiv", "Content-Security-Policy")
        meta.setAttribute("content", "date=no;img-src 'self' data:");
        document.getElementsByTagName('head')[0].appendChild(meta);

        let productsUrl = decodeURIComponent(window.location.search.substring(1));
        if(productsUrl != null && productsUrl != undefined && productsUrl != ''){
            let variables = productsUrl.split('&');
            let searchItem;
            for (let i = 0; i<variables.length;i++){
                if(variables[i].split('=')[0] ='searchItem'){
                    searchItem = variables[i].split('=')[1].replace('+', ' ');
                }
            }
            let action = component.get("c.getSearchResults");
            action.setParams({
                "name": searchItem
            });
            action.setCallback(this, function(response){
                let state = response.getState();
                if(state === 'SUCCESS'){
                    component.set("v.results", response.getReturnValue());
                    component.set("v.header", $A.get("$Label.c.Showing_Results_For") + ": " + searchItem);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(action);
        }else{
            helper.returnNewestProducts(component);
            component.set('v.header', $A.get('$Label.c.Newest_Items'));
        }
        component.set('v.showItems', true);
    },

    showProduct: function(component, event, helper){
        let product = event.getParam('product');
        component.set('v.selectedItem', product);

        component.set('v.showItems', false);
        component.set('v.showProductView', true);
        component.set('v.showHeader', false);
    }
})