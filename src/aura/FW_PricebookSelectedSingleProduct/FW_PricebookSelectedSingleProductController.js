({
    onInit: function(component, event, helper){
        let pricebook = component.get('v.selectedPricebook');
        if(pricebook.Name === 'Standard Price Book'){
            component.set('v.isStandardPB', true);
            component.set('v.priceAfterDiscount', component.get('v.product.price'));
        }else{
            component.set('v.isStandardPB', false);
            component.set('v.priceAfterDiscount', component.get('v.product.discountPrice'));
        }
    },

    getDiscountValues: function(component, event, helper){
        let params = event.getParam('arguments');
        let discountType = params.discountType;
        let discountValue = params.discountValue;
        let priceAfterDiscount;
        if(discountType == '%'){
            priceAfterDiscount = component.get('v.product.price') - component.get('v.product.price') *
                                                 discountValue/100;
            component.set('v.priceAfterDiscount', priceAfterDiscount.toFixed(2));
        }else{
            if((component.get('v.product.price') - discountValue) > 0){
                priceAfterDiscount = component.get('v.product.price') - discountValue;
                component.set('v.priceAfterDiscount', priceAfterDiscount.toFixed(2));
            }else{
                component.set('v.priceAfterDiscount', 0.00);
            }
        }
    },

    passSelectedProducts: function(component, event, helper){
        let product = component.get('v.product');
        let priceAfterDiscount = component.get('v.priceAfterDiscount');
        let isError = false;

        if(!priceAfterDiscount > 0){
            component.find('customToast').showErrorToast($A.get('$Label.c.Prices_Have_To_Be_Higher_Than_0'));
            isError = true;
        }
        let productToDiscount = {
            product: product,
            priceAfterDiscount: priceAfterDiscount,
            isError: isError
        }

        let sendProductToDiscountEvent = component.getEvent('FW_DiscountManagerProductToDiscountEvent');
        sendProductToDiscountEvent.setParams({
            "productToDiscount": productToDiscount
        });
        sendProductToDiscountEvent.fire();
    },

    showDeleteProductModal: function(component, event, helper){
        component.set('v.showDeleteProductModal', true);
    }
})