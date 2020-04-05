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
    },

    passSelectedProducts: function(component, event, helper){
        let product = component.get('v.product');
        let priceAfterDiscount = component.get('v.priceAfterDiscount');
        let isSelected = component.find('checkbox').get('v.value');
        let productToDiscount = {
            product: product,
            priceAfterDiscount: priceAfterDiscount,
            isSelected: isSelected
        }

        let sendProductToDiscountEvent = component.getEvent('FW_DiscountManagerProductToDiscountEvent');
        sendProductToDiscountEvent.setParams({
            "productToDiscount": productToDiscount
        });
        sendProductToDiscountEvent.fire();
    }
})