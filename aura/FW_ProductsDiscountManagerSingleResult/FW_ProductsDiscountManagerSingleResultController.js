({
    getDiscountValues: function(component, event, helper){
        let params = event.getParam('arguments');
        let discountType = params.discountType;
        let discountValue = params.discountValue;
        if(discountType == '%'){
            component.set('v.priceAfterDiscount', component.get('v.product.price') - component.get('v.product.price') *
            discountValue/100);
        }else{
            if((component.get('v.product.price') - discountValue) > 0){
                component.set('v.priceAfterDiscount', component.get('v.product.price') - discountValue);
            }else{
                component.set('v.priceAfterDiscount', 0);
            }
        }
    },

    selectAllEvent: function(component, event, helper){
        component.set('v.checkboxVal', event.getParam('selectAll'));
    }
})