// Code for the View Region page.

// The following is sample code to demonstrate navigation.
// You need not use it for final app.
var regionInstance
  function getConfirm(){
   regionInstance = prompt("Confirm the name of the region")
  }


getKeys()
createSavedRegionsArray()
getConfirm()
//var regionIndex = localStorage.getItem(APP_PREFIX + "-selectedRegion"); 
//if (regionIndex !== null)
{
    // If a region index was specified, show name in header bar title. This
    // is just to demonstrate navigation.  You should set the page header bar
    // title to an appropriate description of the region being displayed.
   // var regionNames = [ "k1", "Region B" ];
   // document.getElementById("myUL").textContent = regionNames[regionIndex];
}

var regionInstanceLatLng,regionInstanceIndex,perimeter,area;

for (var n=0; n <keyArray.length; n++) {
    if (keyArray[n] == regionInstance){
        regionInstanceIndex= n
    }
}

regionInstanceLatLng = savedRegions[regionInstanceIndex]._cornerLocations



function initMap() 
        {
        // Initialise map, centred on Colombo,Sri Lanka.
        map = new google.maps.Map(document.getElementById('googleMap'), {
                center: regionInstanceLatLng[0],
                zoom: 18
            });
            
             createPolygon = new google.maps.Polygon({
          paths: regionInstanceLatLng,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
   createPolygon.setMap(map)
            
            var mapsLatLng=[]
            
            for (var e=0;e<regionInstanceLatLng.length;e++){
                mapsLatLng.push(new google.maps.LatLng(regionInstanceLatLng[e]))
            }
            
            
            
             area = google.maps.geometry.spherical.computeArea(mapsLatLng).toFixed(4);
   
            console.log(mapsLatLng)
            document.getElementById("over_map").innerHTML = "Area:"+" "+area + "m" + "<sup>"+2;

            
            
            perimeter = google.maps.geometry.spherical.computeLength(mapsLatLng).toFixed(4);
            
            console.log(perimeter)
            
            document.getElementById("over_map2").innerHTML = "Perimeter:"+" "+perimeter + "m" ; 
        }




 
