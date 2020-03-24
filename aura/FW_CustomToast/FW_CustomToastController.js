({
    displayToast: function(component, event, helper){
        let params = event.getParam('arguments');
        if(params){
            let title = params.title;
            let message = params.message;
            let type = params.myType;
            let mode = params.mode;

            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": title,
                "message": message,
                "type": type,
                "mode": mode
            });
            toastEvent.fire();
        }
    },

    displayErrorToast: function(component, event, helper){
        let title = $A.get("$Label.c.Error");
        let message = $A.get("$Label.c.Unknown_Error");

        let params = event.getParam('arguments');
        if(params){
            let errors = params.errors;
            if (errors && Array.isArray(errors) && errors.length > 0) {
                message = errors[0].message;
            }
        }
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": 'error',
            "mode": 'sticky'
        });
        toastEvent.fire();
    }
})