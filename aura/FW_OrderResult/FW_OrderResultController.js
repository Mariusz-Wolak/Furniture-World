({
    onInit: function(component, event, helper){
        component.set('v.showOrderDetails', false);
    },

    showDetails: function(component, event, helper){
        console.log('show details in result');

        let order = component.get('v.order');
        console.log('order: '+JSON.stringify(order));

        component.set('v.showOrderDetails', true);
    },

    showComplaintsModal: function(component, event, helper){
        component.set('v.showComplaintsModal', true);

    }
})