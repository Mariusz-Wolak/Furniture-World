({
//    doSelectItem: function(component, event, helper){
//        let orderItem = component.get('v.orderItem');
//        console.log('orderItem: '+JSON.stringify(orderItem));

//      let action = component.get(c.getProductInfo);
//        action.setParams({
//            "productFamily": productFamily,
//            "productId": productId
//        });
//        action.setCallback(this, function(response){
//            let state = response.getState();
//            if(state === 'SUCCESS'){
//                let appEvent = $A.get("e.c:FW_SendSimilarProducts");
//                appEvent.setParams({
//                    "products": response.getReturnValue()
//                });
//                appEvent.fire();
//            }else{
//                component.find('customToast').showErrorToast(response.getError());
//            }
//        });
//        $A.enqueueAction(action);
//    },

//     returnSimilarProducts: function(component){
//        let productFamily = component.get('v.product.family');
//        let productId = component.get('v.product.id');
//        let action = component.get('c.getSimilarProducts');
//        action.setParams({
//            "productFamily": productFamily,
//            "productId": productId
//        });
//        action.setCallback(this, function(response){
//            let state = response.getState();
//            if(state === 'SUCCESS'){
//                let appEvent = $A.get("e.c:FW_SendSimilarProducts");
//                appEvent.setParams({
//                    "products": response.getReturnValue()
//                });
//                appEvent.fire();
//            }else{
//                component.find('customToast').showErrorToast(response.getError());
//            }
//        });
//        $A.enqueueAction(action);
//    }


// to do succesa jak otrzymamy product info, wtedy trzeba spreparowac obiekt 'product' zeby byl taki jak w baskecie i mozna wysylac eventy
//            let product = component.get("v.product");
//            let selectedProductEvent = component.getEvent("selectedProduct");
//            selectedProductEvent.setParams({
//                "product": product
//            });
//            console.log('selectedProduct: '+JSON.stringify(selectedProductEvent.getParams()));
//            selectedProductEvent.fire();
//
//            let appEvent = $A.get('e.c:FW_ProductIdSendToRecordView');
//            appEvent.setParams({
//                "productId": product.Id
//            });
//            console.log('FW_ProductIdSendToRecordView: '+JSON.stringify(appEvent.getParams()));
//            appEvent.fire();
//
//            helper.returnSimilarProducts(component);
})