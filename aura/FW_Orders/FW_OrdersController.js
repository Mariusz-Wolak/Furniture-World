({
    onInit: function(component, event, helper){
        helper.returnOrders(component, event);
        let scrollOptions = {
            left: 0,
            top: 1100,
            behavior: 'smooth'
        }
        setTimeout(function(){ window.scrollTo(scrollOptions); }, 1000);
    }
})