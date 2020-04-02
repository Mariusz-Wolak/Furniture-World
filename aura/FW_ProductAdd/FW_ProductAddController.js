({
    onInit : function(component, event, helper){
        let initAction = component.get("c.getFamilyOptions");
        initAction.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.families", response.getReturnValue());
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(initAction);
    },

    handleUploadFinished: function (component, event, helper) {
        let uploadedFiles = event.getParam("files");
        let filesIds = [];
        uploadedFiles.forEach(function(item){
            filesIds.push(item.documentId);
        });
        component.set("v.filesId", filesIds);
        component.find('customToast').showSuccessToast($A.get("$Label.c.Upload_Has_Been_Finished_Successfully"));
    },

    createProduct : function(component, event, helper){
        let createAction = component.get("c.addProduct");
        createAction.setParams({
            "name" : component.get("v.name"),
            "description" : component.get("v.description"),
            "family" : component.find("selectFamily").get("v.value"),
            "photosIds" : component.get("v.filesId")
        });
        createAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                let navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                    "recordId": response.getReturnValue(),
                    "slideDevName": "detail"
                });
                navEvt.fire();
                component.find('customToast').showSuccessToast($A.get("$Label.c.Product_Has_Been_Added_Successfully"));
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(createAction);
    },

    backToListView: function(component, event, helper){
        let action = component.get('c.getListViewId');
        action.setCallback(this, function(response){
           if(response.getState() === 'SUCCESS'){
                let navEvent = $A.get("e.force:navigateToList");
                navEvent.setParams({
                   "listViewId": response.getReturnValue(),
                   "listViewName": null,
                    "scope": "Product2"
                });
                navEvent.fire();
           }else{
               component.find('customToast').showErrorToast(response.getError());
           }
        });
        $A.enqueueAction(action);
    }
})