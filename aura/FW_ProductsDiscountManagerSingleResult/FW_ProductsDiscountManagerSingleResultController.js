({
    onInit: function(component, event, helper){
        component.set('v.standardPriceInputDisabled', true);
        let price = component.get('v.product.price');
        if(price == null){
            component.set('v.standardPriceInputDisabled', false);
        }
    },

    getDiscountValues: function(component, event, helper){
        let params = event.getParam('arguments');
        let discountType = params.discountType;
        let discountValue = params.discountValue;
        let priceAfterDiscount;
        console.log('discountValue: '+discountValue);
        console.log('discountType: '+discountType);
        console.log(component.get('v.product.name'));
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

    selectAllEvent: function(component, event, helper){
        component.set('v.checkboxVal', event.getParam('selectAll'));
    },

    passSelectedProducts: function(component, event, helper){
        console.log('start tkaing prices f');
        let product = component.get('v.product');
        console.log('start taking prices from product: '+product.name);
        let standardPriceInputDisabled = component.get('v.standardPriceInputDisabled');
        let priceAfterDiscount = component.get('v.priceAfterDiscount');
        let isSelected = component.find('checkbox').get('v.value');
        let isError = false;

        if(standardPriceInputDisabled && isSelected && !priceAfterDiscount > 0){
            component.find('customToast').showErrorToast($A.get('$Label.c.Prices_Have_To_Be_Higher_Than_0'));
            isError = true;
        }
        else if(!standardPriceInputDisabled && isSelected && !product.price > 0){
            component.find('customToast').showErrorToast($A.get('$Label.c.Prices_Have_To_Be_Higher_Than_0'));
            isError = true;
        }
        if(!standardPriceInputDisabled){
            priceAfterDiscount = null;
        }
        let productToDiscount = {
            product: product,
            priceAfterDiscount: priceAfterDiscount,
            isSelected: isSelected,
            isError: isError
        }

        let sendProductToDiscountEvent = component.getEvent('FW_DiscountManagerProductToDiscountEvent');
        sendProductToDiscountEvent.setParams({
            "productToDiscount": productToDiscount
        });
        sendProductToDiscountEvent.fire();
    },

    removeFromPricebook: function(component, event, helper){
        let product = component.get('v.product');
        let sendRemovedProductEvent = $A.get('e.c:FW_SendRemovedProductFromPricebook');
        sendRemovedProductEvent.setParams({
            "product": product
        });
        sendRemovedProductEvent.fire();
    }
})