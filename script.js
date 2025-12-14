let map;              // will hold the Google Map instance
let currentIndex = 0; // which question the user is on
let correctCount = 0;
let incorrectCount = 0;
let rectangles = [];  // store drawn rectangles
let gameOver = false;
let waiting = false;  // when true, disables clicking while loading next question

/* ======================================= */
// --- Google Map Embed Setup ---
function initMap() {
  const csun = { lat: 34.2397, lng: -118.528 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: csun,
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
/* ======================================= */


/* ======================================= */
// --- 5 Locations and their coordinates ---
const locations = [
  {
    name: "Where is the Adam Klotz Health Center?",
    bounds: {
      north: 34.23840998756752, 
      south:  34.23803368286852, 
      east: -118.52588754848539,
      west: -118.52671446963272,
    },
  },
  {
    name: "Where is the Student Recreation Center?",
    bounds: {
      north: 34.240933,
      south:  34.239045,
      east: -118.524550,
      west: -118.525385,
    },
  },
  {
    name: "Where is Bookstein Hall?",
    bounds: {
      north: 34.242512,
      south:  34.241370,
      east: -118.529992,
      west: -118.531244,
    },
  },
  {
    name: "Where is Department Police Services?",
    bounds: {
      north: 34.23894308303874,
      south: 34.23854547572934,
      east: -118.53284752841382,
      west: -118.53370157405175,
    },
  },
  {
    name: "Where is Sierra Hall?",
    bounds: {
      north: 34.238565915825184,
      south: 34.23799534833623,
      east: -118.52983874481697,
      west: -118.53158898169148,
    }
  }
];
/* ======================================= */

function showCurrentQuestion() {
  const messagesList = document.getElementById("messages");

  if (currentIndex >= locations.length) {
    gameOver = true;
    showFinalScore();
    return;
  }

  const location = locations[currentIndex];

  const li = document.createElement("li");
  li.textContent = location.name;
  li.classList.add("question");
  messagesList.appendChild(li);
}

function setupDoubleClickHandler() {
  map.addListener("dblclick", (event) => {
    if (gameOver || waiting) return;
    const clickedLatLng = event.latLng;
    handleGuess(clickedLatLng);
  });
}

function isInsideBounds(latLng, bounds) {
  const lat = latLng.lat();
  const lng = latLng.lng();
  return (
    lat < bounds.north &&
    lat > bounds.south &&
    lng < bounds.east &&
    lng > bounds.west
  );
}

function drawRectangle(bounds, color) {
  const rect = new google.maps.Rectangle({
    strokeColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.35,
    map: map,
    bounds: bounds,
    clickable: false,
  });

  rectangles.push(rect);
}

function handleGuess(clickedLatLng) {
  const location = locations[currentIndex];
  const bounds = location.bounds;

  const correct = isInsideBounds(clickedLatLng, bounds);

  // Convert plain object to Google LatLngBounds
  const googleBounds = new google.maps.LatLngBounds(
    { lat: bounds.south, lng: bounds.west },
    { lat: bounds.north, lng: bounds.east }
  );

  if (correct) {
    correctCount++;
    showMessage("Your answer is correct!", "correct");
    drawRectangle(googleBounds, "#00aa00"); // green
  } else {
    incorrectCount++;
    showMessage("Sorry, wrong location.", "incorrect");
    drawRectangle(googleBounds, "#cc0000"); // red
  }

  currentIndex++;

  waiting = true;

  setTimeout(() => {
    waiting = false;
    showCurrentQuestion();
  }, 1000);
}

function showMessage(text, type) {
  const messagesList = document.getElementById("messages");
  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add(type);
  messagesList.appendChild(li);
}

function showFinalScore() {
  const scoreEl = document.getElementById("score");
  scoreEl.textContent = `${correctCount} Correct, ${incorrectCount} Incorrect`;
}





