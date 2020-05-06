({
    onInit : function(component, event, helper){
        helper.returnFamilyOptions(component, event);
    },

    handleUploadFinished: function (component, event, helper) {
        helper.handleUploadFinished(component, event);
    },

    createProduct : function(component, event, helper){
        helper.createProduct(component, event);
    },

    backToListView: function(component, event, helper){
        helper.backToListView(component, event);
    }
})