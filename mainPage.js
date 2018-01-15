// Code for the main app page (Regions List).

// The following is sample code to demonstrate navigation.
// You need not use it for final app.

function viewRegion(regionIndex)
{
    // Save the desired region to local storage so it can be accessed from view region page.
   // localStorage.setItem(APP_PREFIX + "-selectedRegion", regionIndex); 
    // ... and load the view region page.
    location.href = 'viewRegion.html';
}

function createSavedRegionsArray(){
    getKeys()
    
    for (var x=0; x< keyArray.length;x++) {
        savedRegions[x] = JSON.parse(localStorage.getItem(keyArray[x]))
    }
}
createSavedRegionsArray()
//var one = console.log(savedRegions[1]._name)




for (var a=0; a< savedRegions.length; a++) {

var li = document.createElement("li");

  var t = document.createTextNode(savedRegions[a]._name);
  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);

var ul = document.createElement("ul");

  var s = document.createTextNode(savedRegions[a]._time.replace('Z', '').replace('T', '   / '));
  ul.appendChild(s);
  document.getElementById("myUL").appendChild(ul);


}
 
