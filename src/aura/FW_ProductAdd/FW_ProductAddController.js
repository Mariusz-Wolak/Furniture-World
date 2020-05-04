({
    onInit : function(component, event, helper){
        helper.doGetFamilyOptions(component, event);
    },

    handleUploadFinished: function (component, event, helper) {
        helper.doHandleUploadFinished(component, event);
    },

    createProduct : function(component, event, helper){
        helper.doCreateProduct(component, event);
    },

    backToListView: function(component, event, helper){
        helper.doBackToListView(component, event);
    }
})