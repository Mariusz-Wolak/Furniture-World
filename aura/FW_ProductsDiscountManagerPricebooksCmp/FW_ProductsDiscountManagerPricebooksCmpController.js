({
    onInit: function(component, event, helper){
        console.log('on init');
        helper.receivePricebooksList(component, event);
    },

    openModal: function(component, event, helper){
        component.set('v.showModal', true);
    }
})