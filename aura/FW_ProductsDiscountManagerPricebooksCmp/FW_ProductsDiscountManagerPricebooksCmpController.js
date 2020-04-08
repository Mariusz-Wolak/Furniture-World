({
    onInit: function(component, event, helper){
        helper.receivePricebooksList(component, event);
    },

    openModal: function(component, event, helper){
        component.set('v.showModal', true);
    },

    receiveNewPricebook: function(component, event, helper){
        let newPricebook = event.getParam("pricebook");
        let pricebooksList = component.get('v.pricebooks');
        pricebooksList.unshift(newPricebook);
        component.set('v.pricebooks', pricebooksList);
    },

    refreshPricebooks: function(component, event, helper){
        helper.receivePricebooksList(component, event);
    }

//    selectPricebook: function(component, event, helper){
//        let selectedPricebook = event.getParam('pricebook');
//        let pricebooks = component.get('v.pricebooks');
//        let newPricebooks;
//        for(let i=0; i<pricebooks.length; i++){
//            if(pricebooks[i].Id == selectedPricebook.Id){
//                let pricebookWrapped = {
//                   pricebook: pricebook,
//                   isSelected: true
//               };
//            }else{
//                let pricebookWrapped = {
//                   pricebook: pricebook,
//                   isSelected: false
//                };
//            }
//            newPricebooks.push(pricebookWrapped);
//        }
//        component.set('v.pricebooks', newPricebooks);
//    }
})