// Firebase Initilization
var userId = localStorage.getItem('userId');

var firebaseConfig = {
  apiKey: "AIzaSyDead-k6wjCzNLi4gVS9VL4whIIxgexNr8",
  authDomain: "thoughtscape.firebaseapp.com",
  databaseURL: "https://thoughtscape-default-rtdb.firebaseio.com",
  projectId: "thoughtscape",
  storageBucket: "thoughtscape.appspot.com",
  messagingSenderId: "446236101890",
  appId: "1:446236101890:web:496f25d21ea3703cf0861b",
  measurementId: "G-VHY3SZK6FN"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var email = localStorage.getItem('email');
var username = localStorage.getItem('username');

// Getting basic details 
function  basicDetails(){
  // Getting Username
  var usernameLoc = document.getElementById("usernameLoc");
  usernameLoc.innerHTML = "Username: " + username;
  // Getting Email Address
  var emailLocation = document.getElementById('email');
  emailLocation.innerHTML = "Email Address: " + email;
  // Getting Total Entries
  db.collection("Entries")
  .doc(email)
  .collection("Journal")
  .get()
  .then((querySnapshot) => {
    var count = querySnapshot.size;
    var output = document.getElementById("count");
    output.innerHTML = "Total Number Of Entries: " + count;
  })
}
basicDetails();

function logout() {
  firebase.auth().signOut().then(() => {
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('key');
    localStorage.removeItem('username');
    window.parent.location.href = "/pages/auth.html";
  }).catch((error) => {
    // Handle logout errors here
    console.error("Logout failed: ", error.message);
    alert("Logout failed. Please try again.");
  });
}