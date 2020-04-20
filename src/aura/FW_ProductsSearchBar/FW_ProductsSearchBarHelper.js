({
    doSearch: function(component, event){
        let searchItem = component.get('v.searchItemName');
        let searchItemToSend = searchItem.replace(' ', '+');
        let productsUrl = 'https://fw-community-developer-edition.eu32.force.com/furnitureworldcommunity/s/search?searchItem='+searchItemToSend;
        window.open(productsUrl, '_top');
    }
})