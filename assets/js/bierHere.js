
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDvb4GGuWEBtXj2HkuNi2rwPtsw-rR6NO8",
    authDomain: "practiceuserauthentication.firebaseapp.com",
    databaseURL: "https://practiceuserauthentication.firebaseio.com",
    projectId: "practiceuserauthentication",
    storageBucket: "practiceuserauthentication.appspot.com",
    messagingSenderId: "333032893466"
  };

  firebase.initializeApp(config);

 var database = firebase.database();
 var email ="";
 var password = "";
 var auth= firebase.auth();
 var user = firebase.auth().currentUser;


$("#sign-up-form").hide();

//on click event for submitting login credentials
$("#submit-button").on("click", function(event) {
      event.preventDefault();

// capturing the form values for login email and password
//will need to add form validation later
 	email = $("#inputEmail").val().trim();
 	password = $("#inputPassword").val().trim();
 
 //checking if values are being logged; will delete later
 	console.log(email);
 	console.log(password);

 auth.signInWithEmailAndPassword(email,password);
    //  function(errorObject) {
    //  console.log("Errors handled: " + errorObject.code);
    // };
  // $("#inputEmail").empty();
  // $("#inputPassword").empty();

 });

$(".sign-up-link").on("click", function(event) {
  console.log("sign up form clicked");
  $("#sign-up-form").show();

});

//need to change this click event for a different form that will sign the user up
$("#signup-button").on("click", function(event) {
      event.preventDefault();

// capturing the form values for login email and password
//To Do: add form validation later
 	email = $("#signupEmail").val().trim();
 	password = $("#signupPassword").val().trim();
  confirmPassword = $("#signupConfirmPassword").val().trim();

 //checking if values are being logged; will delete later
 	console.log(email);
 	console.log(password);

  if ( password == confirmPassword) {

   $("#validate-status").append("Passwords Match, Your Account Has Been Created");
   auth.createUserWithEmailAndPassword(email, password);

     // function(errorObject) {
     // console.log("Errors handled: " + errorObject.code);

     // };
} else {
  console.log("passwords dont match");
  //var passwordError = $("<p>").html("Passwords Don't Match")
$("#validate-status").append("Passwords Don't Match");
}

 });

//add a realtime listener
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
  	console.log(user);
    $(".log-out").show();
    $(".dropdown-toggle").hide();
    //$(".dropdown-menu").hide();

  	//To Do: add logout button
    // var logOut =$("<button>")
    // $(".dropdown-toggle").html("Log Out").addClass("log-out-button");
    // $(".dropdown-menu").hide();

  } else {
  	console.log("not logged in");
  	//To Do: hide logout button
    $(".log-out").hide();
  }

});

  //need to have logout button click event
  $(".log-out").on("click", function(event) {
      event.preventDefault();
     firebase.auth().signOut();
      $(".log-out-button").hide();
      $(".dropdown-toggle").show();
});

//  // dynamically changing the inner html of the main panel to create a sign up form
// $(".sign-up-form").on("click", function(event) {
//       event.preventDefault();
//  //  $("#main-title").html("Sign Up Form");
//  // $("#main-panel").html("dynamically created sign up form will go here");
// });