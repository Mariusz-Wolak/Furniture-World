({
    onInit : function(component, event){
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

    handleUploadFinished: function (component, event) {
        let uploadedFiles = event.getParam("files");
        let filesIds = [];
        uploadedFiles.forEach(function(item){
            filesIds.push(item.documentId);
        });
        component.set("v.filesId", filesIds);
        console.log('filesIds: '+component.get('v.filesId'));
    },

    createProduct : function(component, event){
        let family = component.find('selectFamily').get('v.value');
        console.log('family: '+family);
        let createAction = component.get("c.addProduct");
        createAction.setParams({
            "name" : component.get("v.name"),
            "description" : component.get("v.description"),
            "family" : component.find("selectFamily").get("v.value"),
            "photosIds" : component.get("v.filesId")
        });
        console.log(JSON.stringify(createAction.getParams()));
        createAction.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                let sendIdEvent = $A.get("e.c:FW_ProductIdSendToRecordView");
                sendIdEvent.setParams({
                    "productId" : response.getReturnValue()
                });
                sendIdEvent.fire();
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });
        $A.enqueueAction(createAction);
    }
})