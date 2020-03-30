({
    onInit: function(component, event, helper){
//        let searchBar = document.getElementById("searchBar");
////        searchBar.scrollIntoView();

//        var target = component.find("searchBar");
//        var element = target.getElement();
//        var rect = element.getBoundingClientRect();
//        scrollTo({top: element.top, behavior: "smooth"});
    },

    search: function(component, event, helper){
        if(event.which == 13){
            helper.doSearch(component);
        }
    }
})