var db;
var secondsLeft;
var urlParams;
var isAdmin;
var interval;


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

function settimerseconds(seconds) {
  var documentObject = {};
  var docRef = db.collection("common").doc("h2eg1Gl589Z1PDRZoVrp")
  documentObject.deadline = Date.now() / 1000 + seconds;
  docRef.update(documentObject);
}

function checkTime() {
  var docRef = db.collection("common").doc("h2eg1Gl589Z1PDRZoVrp")
  docRef.get().then(function (thisDoc) {
    let message;
    let minutes;
    let seconds;

    deadline = thisDoc.data().deadline;

    let now = Date.now() / 1000;
    secondsLeft = Math.floor(deadline - now);

    if (secondsLeft < 1) {
      message = "TIME'S UP";
      minutes = 0;
      seconds = 0;
    } else {
      message = "Counting";
      minutes = Math.floor(secondsLeft / 60);
      seconds = Math.floor(secondsLeft % 60);
    }

    document.getElementById("bottommsg").innerHTML = message;
    document.getElementById("minute").innerHTML = minutes;
    document.getElementById("second").innerHTML = seconds;

  });
}

urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.toString());

isAdmin = urlParams.get("admin") == "true";

if (!isAdmin) {
  document.getElementById("resetButton").style.visibility = "hidden";
}

document.addEventListener('DOMContentLoaded', domLoaded);
interval = setInterval(checkTime, 1000);
