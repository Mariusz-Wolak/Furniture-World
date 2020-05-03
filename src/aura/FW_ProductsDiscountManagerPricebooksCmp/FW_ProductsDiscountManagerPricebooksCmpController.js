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

    receiveDeletedPricebook: function(component, event, helper){
        let deletedPricebook = event.getParam('pricebook');
        let pricebooksList = component.get('v.pricebooks');
        for(let i=0; i<pricebooksList.length; i++){
            if(pricebooksList[i].Id == deletedPricebook.Id){
                pricebooksList.splice(i, 1);
                break;
            }
        }
        component.set('v.pricebooks', pricebooksList);
    },

    selectPricebook: function(component, event, helper){
        let selectedPricebook = event.getParam('pricebook');
        let pricebooks = component.get('v.pricebooks');

        pricebooks.forEach(pricebook => {
            if(pricebook.Id === selectedPricebook.Id){
                pricebook.isSelected = true;

            }else{
                pricebook.isSelected = false;
            }});

         component.set('v.pricebooks', pricebooks);
    },

    onChange: function(component, event, helper){
        let pricebooks = component.get('v.pricebooks');
    }
})