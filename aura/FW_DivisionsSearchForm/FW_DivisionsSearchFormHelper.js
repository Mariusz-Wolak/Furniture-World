({
    doSearch:function(component){
        let action = component.get("c.getSearchResults");
        let name = component.get("v.searchItemName");
        let city = component.get("v.searchItemCity");
        let country = component.get("v.searchItemCountry");
        action.setParams({
           "name": name,
           "city": city,
           "country": country
        });
        action.setCallback(this, function(response){
           let state = response.getState();
           if(state === 'SUCCESS'){
               let appEvent = $A.get("e.c:FW_SendResultsToResultList");
               appEvent.setParams({"results": response.getReturnValue()});
               appEvent.fire();
           } else{
               let title = $A.get("$Label.c.Error");
               let message = $A.get("$Label.c.Unknown_Error");
               let errors = response.getError();
               if (errors && Array.isArray(errors) && errors.length > 0) {
                   message = errors[0].message;
               }

               let toastComponent = component.find('customToast');
               toastComponent.showToast(title, message, 'error', 'sticky');
             }
        });
        $A.enqueueAction(action);
    }
})