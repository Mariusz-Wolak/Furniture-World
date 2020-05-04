({
    doSearch: function(component, event){
        let searchItem = component.get('v.searchItemName');
        let searchItemToSend = searchItem.replace(' ', '+');
        let productsUrl = $A.get('$Label.c.FW_Search_URL')+'?searchItem='+searchItemToSend;
        window.open(productsUrl, '_top');
    }
})