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

    updatePricebook: function(component, event, helper){
        let updatedPricebook = event.getParam('pricebook');
        let pricebooksList = component.get('v.pricebooks');
        for(let i=0; i<pricebooksList.length; i++){
            if(pricebooksList[i].Id == updatedPricebook.Id){
                pricebooksList.splice(i, 1);
                break;
            }
        }
        pricebooksList.unshift(updatedPricebook);
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