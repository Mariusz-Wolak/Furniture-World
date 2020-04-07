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
        pricebooksList.push(newPricebook);
        component.set('v.pricebooks', pricebooksList);
    },

    selectPricebook: function(component, event, helper){
//        let selectedPricebook = event.getParam('pricebook');
//        let pricebooks = component.get('v.pricebooks');
//        for(let i=0; i<pricebooks.length; i++){
//            if(pricebooks[i].Id != selectedPricebook.Id){
//
//            }
//        }
    }
})