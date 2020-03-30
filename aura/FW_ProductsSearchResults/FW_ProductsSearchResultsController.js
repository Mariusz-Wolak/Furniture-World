({
    onInit: function(component, event, helper){
        let meta = document.createElement("meta");
        meta.setAttribute("name", "format-detection");
        meta.setAttribute("http-equiv", "Content-Security-Policy")
        meta.setAttribute("content", "date=no;img-src 'self' data:");
        document.getElementsByTagName('head')[0].appendChild(meta);
        let scrollOptions = {
            left: 0,
            top: 1100,
            behavior: 'smooth'
        }
        setTimeout(function(){ window.scrollTo(scrollOptions); }, 1000);

        helper.returnNewestProducts(component);

        component.set('v.header', $A.get('$Label.c.Newest_Items'));
        component.set('v.showItems', true);
    },

    receiveSearchResults: function(component, event, helper){
        let searchItemName = event.getParam("searchItemName");
        let resultsFromEvent = event.getParam("results");


        component.set("v.results", resultsFromEvent);
        component.set("v.header", $A.get("$Label.c.Showing_Results_For") + ": " + searchItemName);

        component.set('v.showItems', true);
        component.set('v.showProductView', false);
        component.set('v.showHeader', false);

    },

    showProduct: function(component, event, helper){
        let product = event.getParam('product');
        component.set('v.selectedItem', product);

        component.set('v.showItems', false);
        component.set('v.showProductView', true);
        component.set('v.showHeader', false);
    }
})