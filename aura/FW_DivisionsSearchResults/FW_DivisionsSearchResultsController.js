({
    onInit : function(component, event, helper){
        let resultsFromEvent = event.getParam("results");
        component.set("v.resultsList", resultsFromEvent);
    },

    setDivisionId: function(component, event, helper){
        let resultsList = component.get("v.resultsList");
        let divisionId = event.currentTarget.dataset.id;
        component.set("v.index", divisionId);
        let arr = component.find("resultItem");
        for(let i=0; i<arr.length; i++){
            let itemId = arr[i].getElement().getAttribute("data-id");
            if(itemId !== divisionId){
                $A.util.removeClass(arr[i], "selectedRow");
            }else{
                $A.util.addClass(arr[i], "selectedRow");
            }
        }
        let appEvent = $A.get("e.c:FW_SelectedRecord");
        appEvent.setParams({"record": resultsList[divisionId]});
        appEvent.fire();
    }
});