({
    onInit: function(component, event, helper){
        helper.checkIfProductsAreObserved(component);
    },

    setTotalQuantity: function(component, event, helper){
        component.set('v.totalQuantity', event.getParam('totalQuantity'));
        component.find('customToast').showSuccessToast($A.get('$Label.c.Item_Has_Been_Added_To_Basket'));
    }
})