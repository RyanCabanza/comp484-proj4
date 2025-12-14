// app.js

let map;              // will hold the Google Map instance
let currentIndex = 0; // which question we're on
let correctCount = 0;
let incorrectCount = 0;
let rectangles = [];  // store drawn rectangles
let gameOver = false;

// Called automatically because of callback=initMap in the script URL
function initMap() {
  const csunCenter = { lat: 34.2400, lng: -118.5295 }; // approx CSUN

  map = new google.maps.Map(document.getElementById("map"), {
    center: csunCenter,
    zoom: 17,
    mapId: "9b4fa5c9b2cfd46f23aaa2d5",
    disableDefaultUI: true,
    gestureHandling: "none",
    draggable: false,
    disableDoubleClickZoom: true,
  });

  setupDoubleClickHandler();
  showCurrentQuestion();
}







