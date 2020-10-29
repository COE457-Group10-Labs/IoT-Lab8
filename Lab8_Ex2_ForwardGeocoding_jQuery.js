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

//----------------------------------------------------------------------------------
//Ex2 - Forward Geocoding using Address in String format

//format of Query is 'https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json'
var fixedURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";   //endpoint used is 'places'
var accessToken = "pk.eyJ1IjoibXJlZGEyMCIsImEiOiJja2dxeWY2bDEyejNlMzB0ZXJqajcyY2d1In0.B5o1M7F8RvZmBhKJ_dnYUg";

//setGeocodedAddress() - sets a marker at the coordinates retrieved using API Query based on the text address entered in the text box
function setGeocodedAddress() {
    //get the string address from the input textbox
    var strAddress = $("#addressText").val();
    console.log("Geocoding Function received: " + strAddress);

    //encode the address in URI format
    var encodedSearchText = encodeURIComponent(strAddress);
    console.log("Encoded text: " + encodedSearchText);

    //create the full API Query link
    var fullApiQuery = fixedURL + encodedSearchText + ".json?access_token=" + accessToken;
    console.log("Full Query: " + fullApiQuery);

    //AJAX used to carry out request
    var searchCoordinates;
    $.ajax( {
        type: "GET",
        dataType: 'JSON',
        url: fullApiQuery,
    }).done( function(responseResult) { //done() - callback function used after AJAX response is returned 
        console.log("success");         //successfully retrieved a JSON response (not necessarily valid location)
        console.log(responseResult);

        //checking if location was a valid one (i.e. features has at least one item in it)
        if (responseResult.features.length == 0)
        {
            alert("Error. Location entered is not valid, so no location could be retrieved. \nPlease try again.");
            return;
        }

        //for valid location returned (at least one returned)
        for (var i = 0; i < responseResult.features.length; i++) 
        {
            console.log(responseResult.features[i].geometry.coordinates);
        }

        //save first coordinates from features and use them as results coordinates
        searchCoordinates = responseResult.features[0].geometry.coordinates;
        console.log("Search Coordinates: " + searchCoordinates);

        //add marker to the searchCoordinates location (searchCoordinates are SWAPPED - format is long,lat)
        var adjustedSearchCoordinates = [searchCoordinates[1], searchCoordinates[0]]
        var searchResultMarker = L.marker(adjustedSearchCoordinates).addTo(mymap);
        
        //add popup to the marker
        searchResultMarker.bindPopup("<b>Search Result Location</b>").openPopup();

        //adjust map to display location in center of map
        mymap.setView(adjustedSearchCoordinates, 15);
    })
}