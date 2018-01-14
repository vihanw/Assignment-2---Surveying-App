// Code for the Record Region page.
var pos;

     //variables for map and infowindow
        var map,infoWindow,accuracyValid,createPolygon;

        var currentLocation 

        var cornerArray =[];


    //initialising the map
        function initMap() 
        {
        // Initialise map, centred on Colombo,Sri Lanka.
        map = new google.maps.Map(document.getElementById('googleMap'), {
                center: {lat: 6.9271, lng: 79.8612},
                zoom: 18
            });
             
        //define the info window which is to be shown on the map
            infoWindow = new google.maps.InfoWindow;
            
    
     createPolygon = new google.maps.Polygon({
          paths: cornerArray,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
   
       // createPolygon.setMap(map);
        
      }



        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function(position) {
            
              
              if (position.coords.accuracy<10) {
                  accuracyValid=true;
              }
           
        //save the current latitude and longitude values in pos
              pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
      
        test = pos;
    //console.log(test)
              
        //obtain the accuracy in meters and round off to two decimal places
            var accuracy = Math.round(position.coords.accuracy*100)/100;
             
            
        //place the infowindow on the current position 
            infoWindow.setPosition(pos);
              
        //display the live accuracy on the infowindow
            infoWindow.setContent("Accuracy: "+accuracy.toString());
            
        //place the infowindow on the map  
            infoWindow.open(map);
              
        //center the map on the current position
            map.setCenter(pos);
            
          }, 
        
            function() {
            handleLocationError(true, infoWindow, map.getCenter());
          },{enableHighAccuracy : true});
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
           
          //function to autoupdate and refresh the map
            function autoUpdate(){
                navigator.geolocation.getCurrentPosition(function(position){
                    var newCenter = new google.maps.LatLng(position.coords.latitude,
                                                         position.coords.longitude);
                    
                    map.setCenter(newCenter);
                    
                });
                
            //Set a time to run the autoUpdate function, time is in ms
                setTimeout(autoUpdate,500);
            }
      autoUpdate();
        
        

       //error message to be displayed if geolocation is not supported
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

function addCorner(){
    //*******Uncomment if else structure**********************************
    //if (accuracyValid==true) {
    cornerArray.push(pos);
    createPolygon.setPath(cornerArray);
    createPolygon.setMap(map)
    displayMessage('Corner Added',1000)
    
    return cornerArray
      //  }
   // else{
     //   displayMessage('Accuracy Insufficient',1500)
    //}
};

function resetRegion(){
   var confirmation = confirm("Are you sure you want to clear the region?");
    cornerArray=[];
    createPolygon.setPath(cornerArray)
    createPolygon.setMap(null)
    displayMessage('Region Removed',1000)
};




function saveRegion(){
   if (cornerArray.length>2) {
   
if(typeof(Storage)!=="undefined") { 
    var nameLocalStorage = prompt("Please Enter Region Name")
    
   regionNew = new Region(nameLocalStorage,cornerArray,new Date);
   localStorage.setItem(nameLocalStorage,JSON.stringify(regionNew))
   window.alert("Region Saved")
            
   //*****window.history.back();****
            
    }
       else{
           window.alert("localStorage is not supported by current browser.")
       }
}
else {window.alert("Should contain atleast 2 corners")}
}
