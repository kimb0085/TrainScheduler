// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBXo6pbtAp25dRESdY5MznQrbS4eYKh_g4",
    authDomain: "trainscheduler-bf858.firebaseapp.com",
    databaseURL: "https://trainscheduler-bf858.firebaseio.com",
    projectId: "trainscheduler-bf858",
    storageBucket: "",
    messagingSenderId: "939304117402"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var trainName = "";
  var destination = "";
  var frequency = "";
  var startTime = "HH:mm";
  var nextArrival = "";
  var minutesAway = "";

  var newTime = moment(startTime).format("HH:mm");

  $(document).ready(function() {
  	$(".table").append([
  		'<tr>',
  			'<td>Winston</td>',
  			'<td>London</td>',
  			'<td>25</td>',
  			'<td>17:32</td>',
  			'<td>12</td>',

  		'<tr>',
  			'<td>Ruby</td>',
  			'<td>Chicago</td>',
  			'<td>2</td>',
  			'<td>08:16</td>',
  			'<td>1</td>'])
  });

  $("#addData").on("click", function(event) {
  	event.preventDefault();

  	trainName = $("#trainName").val().trim();
  	destination = $("#destination").val().trim();
  	startTime = $("#startTime").val().trim();
  	frequency = $("#frequency").val().trim();

  	var newTrain = database.ref().push({
  	});

  	newTrain.set({
  		trainName: trainName,
  		destination: destination,
  		startTime: startTime,
  		frequency: frequency,
      nextArrival: nextArrival,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	});

  });

   database.ref().on("child_added", function(snapshot) {
    var trainRow = $("<tr>");
    nextArrival = moment(startTime, 'HH:mm:ss').add(frequency, 'minutes').format('HH:mm');

    trainRow.html("<td>" + snapshot.child("trainName").val() + "</td>" + "<td>" + snapshot.child("destination").val() + "</td>" + "<td>" + snapshot.child("frequency").val() + "</td>" + "<td>" + snapshot.child("startTime").val() + "</td>" + "<td>" + snapshot.child("nextArrival").val() + "</td>");
    $(".table").append(trainRow);
  });
