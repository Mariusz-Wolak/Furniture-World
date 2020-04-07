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
    }
})