({
    doToggleObserved: function(component, event, helper){
        console.log('dziala manager helper, tu powinien byc strzal do bazy!');
        console.log('before event get param');
        let params = event.getParam('arguments');
        console.log('params: '+params);
        if(params){
            let productId = params.productId;
            console.log('productId in manager: '+productId);



//            let title = params.title;
//            let message = params.message;
//            let type = params.myType;
//            let mode = params.mode;
//
//            let toastEvent = $A.get("e.force:showToast");
//            toastEvent.setParams({
//                "title": title,
//                "message": message,
//                "type": type,
//                "mode": mode
//            });
//            toastEvent.fire();
        }
    }
})