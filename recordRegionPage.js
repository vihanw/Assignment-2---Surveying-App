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
            
    //specifying properties to create a polygon
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
//run the autoUpdate function 
   autoUpdate();
        
        

       //error message to be displayed if geolocation is not supported
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        
   //place the infowindow on the current location so that it acs as a location //pin
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
   //open the infowindow on the map
        infoWindow.open(map);
      }

//onclick function to add corners
function addCorner(){
    //*******Uncomment if else structure**********************************
 //check for accuracy before saving a corner
    //if (accuracyValid==true) {
   
 //push the current location to the array containing all the region locations
    cornerArray.push(pos);
 
 //update the polygon showing the area
    createPolygon.setPath(cornerArray);
    createPolygon.setMap(map)
    
 //success message after adding the corner
    displayMessage('Corner Added',1000)
    
 //return the array of corner locations
    return cornerArray
      //  }
   
 //display error if location accuracy is insufficient 
    // else{
     //   displayMessage('Accuracy Insufficient',1500)
    //}
};

//onclick function for resetting a region
function resetRegion(){
    
 //obtaining a confirmation from the user
   var confirmation = confirm("Are you sure you want to clear the region?");
    
 //emptying the corner array
    cornerArray=[];
    
 //clearing the polygon
    createPolygon.setPath(cornerArray)
    createPolygon.setMap(null)
    
 //displaying a message after successfully clearing a region
    displayMessage('Region Removed',1000)
};



//onclick function to save the region
function saveRegion(){
   
 //checking if a sufficient amount of corners are present
    if (cornerArray.length>2) {
   
 //checking if local storage is present
if(typeof(Storage)!=="undefined") { 
   
 //getting user input for the key to be saved in local storage and also the   //nickname given by the user to display on the main page
    var nameLocalStorage = prompt("Please Enter Region Name")
    
 //creating a new region using the constructor class
   regionNew = new Region(nameLocalStorage,cornerArray,new Date);
 
 //saving the new region to local storage after stringifying
   localStorage.setItem(nameLocalStorage,JSON.stringify(regionNew))
    
 //displaying a message after successfully saving the region into the local //storage
   window.alert("Region Saved")
            
 //going back to the main page 
    //*****window.history.back();****
            
    }
 //displaying error if local storage is not suported        
       else{
           window.alert("localStorage is not supported by current browser.")
       }
}
    
 //displaying alert if the number of corners are insufficient
else {window.alert("Should contain atleast 2 corners")}
}
