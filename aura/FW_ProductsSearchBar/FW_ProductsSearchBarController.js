({
    onInit: function(component, event, helper){
        let scrollOptions = {
            left: 0,
            top: 1100,
            behavior: 'smooth'
        }
        console.log('scroll options: '+JSON.stringify(scrollOptions));
        setTimeout(function(){ window.scrollTo(scrollOptions); }, 1000);
    },

    search: function(component, event, helper){
        if(event.which == 13){
            helper.doSearch(component);
        }
    }
})