({
    onInit: function(component, event, helper){
    },

    search: function(component, event, helper){
        if(event.which == 13){
            helper.search(component, event);
        }
    }
})