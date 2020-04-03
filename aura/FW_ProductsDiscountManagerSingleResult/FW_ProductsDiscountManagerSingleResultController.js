({
    getDiscountValues: function(component, event, helper){
        let params = event.getParam('arguments');
        let discountType = params.discountType;
        let discountValue = params.discountValue;
        if(discountType == '%'){
            component.set('v.priceAfterDiscount', component.get('v.product.price') - component.get('v.product.price') *
            discountValue/100);
        }else{
            component.set('v.priceAfterDiscount', component.get('v.product.price') - discountValue);
        }

        console.log('discount value and type in single result: '+discountValue+' '+discountType);
    }
})