var db;
var secondsLeft;
var urlParams;
var isAdmin;
var interval;
var adminControls = document.querySelector("#adminControls");
var radioButtons = document.querySelector("#radioButtons");
var clock = document.querySelector("#clockdiv");
var orangeThreshold;
var redThreshold = 0;
var fixedDuration = false;

function domLoaded() {
  try {
    let app = firebase.app();
    db = firebase.firestore();

    let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] ===
      'function');

  } catch (e) {
    console.error(e);
    document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
  }
}

function settimerseconds() {
  // https://stackoverflow.com/a/15839451/3956024
  var minutes;
  var seconds;
  if (fixedDuration) {
    if (urlParams.has("minutes")) {
      minutes = parseInt(urlParams.get("minutes"));
      seconds = 60 * minutes;
    } else if (urlParams.has("seconds")) {
      seconds = parseInt(urlParams.get("seconds"));
    }
  } else {
    var element = document.querySelector('input[name="talkDuration"]:checked')
    minutes = parseInt(element.value);
    seconds = 60 * minutes;
  }

  var documentObject = {};
  var docRef = db.collection("common").doc("h2eg1Gl589Z1PDRZoVrp")
  documentObject.deadline = Date.now() / 1000 + seconds;
  docRef.update(documentObject);
}

function checkTime() {
  var docRef = db.collection("common").doc("h2eg1Gl589Z1PDRZoVrp")
  docRef.get().then(function (thisDoc) {
    let minutes;
    let seconds;
    let timeString;

    deadline = thisDoc.data().deadline;

    let now = Date.now() / 1000;
    secondsLeft = Math.floor(deadline - now);

    if (secondsLeft < 1) {
      minutes = -Math.ceil(secondsLeft / 60);
      seconds = -Math.ceil(secondsLeft % 60);
      timeString = `-${minutes}:${zeroFill(seconds, 2)}`;
      document.body.style.background = "crimson";
    } else {
      minutes = Math.floor(secondsLeft / 60);
      seconds = Math.floor(secondsLeft % 60);
      timeString = `${minutes}:${zeroFill(seconds, 2)}`;
      if (secondsLeft < orangeThreshold) {
        document.body.style.background = "orange";
      } else {
        document.body.style.background = "black";
      }
    }
    clock.innerHTML = timeString;
  });
}

function zeroFill(number, width) {
  // https://stackoverflow.com/a/1267338/3956024
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + ""; // always return a string
}

urlParams = new URLSearchParams(window.location.search);
isAdmin = urlParams.get("admin") == "true";
if (!isAdmin) {
  adminControls.style.visibility = "hidden";
  clock.style.fontSize = "70vmin";
}

if (urlParams.has("minutes") || urlParams.has("seconds")) {
  radioButtons.style.visibility = "hidden";
  fixedDuration = true;
}

if (urlParams.has("debug")) {
  orangeThreshold = 5;
} else {
  orangeThreshold = 60;
}

document.addEventListener('DOMContentLoaded', domLoaded);
interval = setInterval(checkTime, 1000);
