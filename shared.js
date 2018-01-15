"use strict"

// Shared code needed by the code of all three pages.

// Prefix to use for Local Storage.  You may change this.
//var APP_PREFIX = "monash.eng1003.fencingApp";

// Array of saved Region objects.
var savedRegions = [];

var keyArray = [];


function getKeys() {
for(var i=0;i<localStorage.length; i++) {
  keyArray[i]=localStorage.key(i)
}
}

function createSavedRegionsArray(){
    getKeys()
    
    for (var x=0; x< keyArray.length;x++) {
        savedRegions[x] = JSON.parse(localStorage.getItem(keyArray[x]))
    }
}


// This function displays the given message String as a "toast" message at
// the bottom of the screen.  It will be displayed for 2 second, or if the
// number of milliseconds given by the timeout argument if specified.
function displayMessage(message, timeout)
{
    if (timeout === undefined)
    {
        // Timeout argument not specifed, use default.
        timeout = 2000;
    } 

    if (typeof(message) == 'number')
    {
        // If argument is a number, convert to a string.
        message = message.toString();
    }

    if (typeof(message) != 'string')
    {
        console.log("displayMessage: Argument is not a string.");
        return;
    }

    if (message.length == 0)
    {
        console.log("displayMessage: Given an empty string.");
        return;
    }

    var snackbarContainer = document.getElementById('toast');
    var data = {
        message: message,
        timeout: timeout
    };
    if (snackbarContainer && snackbarContainer.hasOwnProperty("MaterialSnackbar"))
    {
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
}

//class for a region
class Region {
    constructor(name,cornerLocations,time) {
        this._name = name;
        this._cornerLocations=cornerLocations;
        this._time =time;
   
        var _name = name
        this.setName = function(name) {_name = name;}
        this.getName = function() { return _name;}
        
        var _cornerLocations = cornerLocations
        this.setCornerLocations = function(cornerLocations) { _cornerLocations = cornerLocations;}
        this.getCornerLocations = function(){ return _cornerLocations;}
        
        var _time = time;
        this.setTime = function(time) {_time = time;}
        this.getTime = function() {return _time;}
    }
}
    
var region1 = null;
var regionNew = null;

