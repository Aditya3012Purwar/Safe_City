// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAXRQdG0xFkdQzQVFCkPx_N80D4lV2yON8",
    authDomain: "incidentreport-9dfb0.firebaseapp.com",
    projectId: "incidentreport-9dfb0",
    storageBucket: "incidentreport-9dfb0.appspot.com",
    messagingSenderId: "431823637095",
    appId: "1:431823637095:web:504746a5650f59ebf0e2c2",
    measurementId: "G-HG9847ER4W"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Create a listener for the report incident form
  document.getElementById('incident-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get the data from the form
    const incidentType = document.getElementById('incident-type').value;
    const incidentLocation = document.getElementById('incident-location').value;
    const incidentDescription = document.getElementById('incident-description').value;
  
    // Push the data to the database
    console.log("before push");
    db.collection('Incidentdata').add({
      incidentType: incidentType,
      incidentLocation: incidentLocation,
      incidentDescription: incidentDescription
    })
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
  
    // Reset the form after submitting the report
    document.getElementById('incident-form').reset();
  });
  