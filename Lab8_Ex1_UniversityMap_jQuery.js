//Initialize starting coordinates (initial center point of map)
var startingCoordinates = [25.312355, 55.489484]; //coordinates of AUS

//Initialize map - set chosen initial view and zoom level 
var mymap = L.map('mapID').setView(startingCoordinates, 15); 

//Add Mapbox Streets tile layer to map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXJlZGEyMCIsImEiOiJja2dxeWY2bDEyejNlMzB0ZXJqajcyY2d1In0.B5o1M7F8RvZmBhKJ_dnYUg', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

//----------------------------------------------------------------------------------
//Ex1 - Set marker based on input coordinates
//setMarkerAtAddress() - sets a marker at the address coordinates entered in the text box
function setMarkerAtAddress() 
{
    //get the address coordinates string from the input textbox
    var fullAddress = $('#addressInput').val();             //get the entered latitude and longitude
    
    //split the address coordinates string to get the lat. and long.
    var splitAddress = fullAddress.split(",");              //array w/ lat at [0] and long at [1] 
    splitAddress[0] = splitAddress[0].trim();               //trim in case any spaces were added
    splitAddress[1] = splitAddress[1].trim();
    console.log("Lat = " + splitAddress[0] + " Long = " + splitAddress[1]);

    //add marker at the selected location
    var addressCoordinates = [splitAddress[0], splitAddress[1]];
    var addedMarker =  L.marker(addressCoordinates).addTo(mymap);
    
    //add popup to marker
    addedMarker.bindPopup("<b>Added Coordinates Location</b>").openPopup();

    //adjust map to display location in center of map
    mymap.setView(addressCoordinates, 15);
}   

//can test with university's starbucks location: 25.312146, 55.492711