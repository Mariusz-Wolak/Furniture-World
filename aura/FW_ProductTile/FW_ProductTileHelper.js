({
    doToggleObserved: function(component){
      let observedProductsManager = component.find('observedProductsManager');
      observedProductsManager.toggleObserved('id1234');
    }
})