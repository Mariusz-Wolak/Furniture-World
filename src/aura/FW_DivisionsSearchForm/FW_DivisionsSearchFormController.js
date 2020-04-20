({
    search:function(component,event,helper){
        helper.doSearch(component);
    },

    clear: function(component, event, helper){
        component.set("v.searchItemName", '');
        component.set("v.searchItemCountry", '');
        component.set("v.searchItemCity", '');

        let appEvent = $A.get("e.c:FW_SendResultsToResultList");
        appEvent.setParams({"results": []});
        appEvent.fire();
    }
});