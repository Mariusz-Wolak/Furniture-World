({
    onInit : function(component, event){
        let initAction = component.get("c.getFamilyOptions");
        initAction.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
              component.set("v.families", response.getReturnValue());
            }else{

            }
        });
        $A.enqueueAction(initAction);
    },

    handleUploadFinished: function (component, event) {
        let uploadedFiles = event.getParam("files");
        let filesIds = [];
        uploadedFiles.forEach(function(item){
            filesIds.push(item.documentId);
        });
        component.set("v.filesId", filesIds);
    },

    createProduct : function(component, event){
        let createAction = component.get("c.addProduct");
        createAction.setParams({
            "name" : component.get("v.name"),
            "description" : component.get("v.description"),
            "family" : component.get("v.family"),
            "photosIds" : component.get("v.filesId")
        });
        console.log(JSON.stringify(createAction.getParams()));
        createAction.setCallback(this, function(response){
            console.log(response.getState());
            if(response.getState() === "SUCCESS"){
                let sendIdEvent = $A.get("e.c:FW_ProductIdSendToRecordView");
                sendIdEvent.setParams({
                    "productId" : response.getReturnValue()
                });
                sendIdEvent.fire();
            }else{
                console.log(response.getError()[0]);
            }
        });
        $A.enqueueAction(createAction);
    }
})