
({
    onInit: function(component, event, helper){
        console.log('on init product photos');
        component.set('v.showPhotos', false);
    },

    receiveProductId: function(component, event, helper){
        let productId = event.getParam('productId');
        console.log('productId in receive product in photos: '+productId);

        let action = component.get('c.loadPhotos');
        action.setParams({
           "id": productId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.photos', response.getReturnValue());
                                console.log('response load photos: '+JSON.stringify(response.getReturnValue()));
                                component.set('v.showPhotos', true);
                                let res = response.getReturnValue();
                                for(let i=0; i<res.length; i++){
                                    let id = res[i].imgURL__c;
                                    res[i].imgURL__c = 'https://furnitureworld-dev-ed.lightning.force.com/sfc/servlet' +
                                                                                   '.shepherd/document/download/'+id;
                                                                                   console.log('photo: '+res[i].imgURL__c);
                                }
                                component.set('v.product', res[0].imgURL__c);
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });


        console.log('before action 2');
        let action2 = component.get('c.getMainPhoto');
        action2.setParams({
           "productId": productId
        });
        action2.setCallback(this, function(response){
            let state = response.getState();
            console.log('state: '+state);
            if(state === 'SUCCESS'){
                component.set('v.product', response.getReturnValue());
                console.log('response get main photo: '+JSON.stringify(response.getReturnValue()));
            }else{
                component.find('customToast').showErrorToast(response.getError());
            }
        });


        $A.enqueueAction(action2);
        $A.enqueueAction(action);
    },

    getMainPhoto: function(component, event, helper){
        let mainPhoto = event.getParam('photo');
        component.set('v.product', mainPhoto);
    }
})