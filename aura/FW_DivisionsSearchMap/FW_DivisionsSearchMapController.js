({
      onInit: function(component, event, helper){
          let resultsFromEvent = event.getParam("results");
          component.set("v.resultsList", resultsFromEvent);
          let zoomLevel = 1;
          let mapMarkers = [];
          for(let i=0; i<resultsFromEvent.length; i++){
              let account = resultsFromEvent[i];
              let marker = {
                  'location': {
                      'Street': account.ShippingStreet,
                      'City': account.ShippingCity,
                      'PostalCode': account.ShippingPostalCode
                  },
                  'title': account.Name,
                  'icon': 'standard:location'
              };
              mapMarkers.push(marker);
          }
          component.set('v.mapMarkers', mapMarkers);
          component.set('v.zoomLevel', zoomLevel);
      },

      zoomMap: function(component, event, handler){
          let record = event.getParam("record");
          let zoomLevel = 18;
          let mapMarkers = [];
          let marker = {
              'location': {
                  'Street': record.ShippingStreet,
                  'City': record.ShippingCity,
                  'PostalCode': record.ShippingPostalCode
              },
              'title': record.Name,
              'icon': 'standard:location'
          };
          mapMarkers.push(marker);
          component.set('v.mapMarkers', mapMarkers);
          component.set('v.zoomLevel', zoomLevel)
      }
  })