({
    onInit: function(component, event, helper){
        let record = event.getParam("record");
        component.set("v.record", record);
    },

    setResultsList: function(component, event, helper){
        let resultsFromEvent = event.getParam("results");
        component.set("v.resultsList", resultsFromEvent);
        if(resultsFromEvent.size === undefined){
            component.set("v.record", null);
        }
    },

    openDeleteModal: function(component, event, helper) {
        component.set("v.deleteDivisionIsOpen", true);
    },

    editRecord : function(component, event, helper) {
        let editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
             "recordId": component.get("v.record.Id")
       });
        editRecordEvent.fire();
        component.set("v.record", null);
        let appEvent = $A.get("e.c:FW_SendResultsToResultList");
        appEvent.setParams({"results": []});
        appEvent.fire();
    },

    getRecord: function(component, event, helper){
        let record = event.getParam("record");
        component.set("v.record", record);
        component.set("v.deleteDivisionIsOpen", false);
        console.log('powinno zamknac modala w detailsach');
    }
})