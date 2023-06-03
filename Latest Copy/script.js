document.addEventListener('DOMContentLoaded', function() {
  const homeLink = document.getElementById('home-link');
  const reportLink = document.getElementById('report-link');
  const alertsLink = document.getElementById('alerts-link');
  const engagementLink = document.getElementById('engagement-link');
  const loginLink = document.getElementById('login-link');

  const homeSection = document.getElementById('home-section');
  const reportSection = document.getElementById('report-section');
  const alertsSection = document.getElementById('alerts-section');
  const engagementSection = document.getElementById('engagement-section');
  const loginSection = document.getElementById('login-section');

  const incidentForm = document.getElementById('incident-form');
  const alertsList = document.getElementById('alerts-list');

  homeLink.addEventListener('click', function(event) {
    event.preventDefault();
    showSection(homeSection);
  });

  reportLink.addEventListener('click', function(event) {
    event.preventDefault();
    showSection(reportSection);
  });

  alertsLink.addEventListener('click', function(event) {
    event.preventDefault();
    showSection(alertsSection);
    fetchAlerts();
  });

  engagementLink.addEventListener('click', function(event) {
    event.preventDefault();
    showSection(engagementSection);
  });

  loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    showSection(loginSection);
  });

  incidentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const incidentType = document.getElementById('incident-type').value;
    const incidentLocation = document.getElementById('incident-location').value;
    const incidentDescription = document.getElementById('incident-description').value;

    // Push the data to the database
    firebase.database().ref('incidents').push({
      incidentType: incidentType,
      incidentLocation: incidentLocation,
      incidentDescription: incidentDescription
    });

    // Reset the form after submitting the report
    incidentForm.reset();
  });

  function fetchAlerts() {
    // Simulated data
    const alertsData = [
      {
        title: 'Crime Alert: Theft',
        description: 'A theft incident has been reported near Main Street.'
      },
      {
        title: 'Weather Alert: Heavy Rainfall',
        description: 'Expect heavy rainfall in the area today. Stay indoors.'
      }
    ];

    // Clear existing alerts
    alertsList.innerHTML = '';

    // Iterate through alerts data and create HTML elements
    alertsData.forEach(function(alert) {
      const alertItem = document.createElement('li');
      const alertTitle = document.createElement('h3');
      const alertDescription = document.createElement('p');

      alertTitle.textContent = alert.title;
      alertDescription.textContent = alert.description;

      alertItem.appendChild(alertTitle);
      alertItem.appendChild(alertDescription);

      alertsList.appendChild(alertItem);
    });
  }

  function showSection(section) {
    // Hide all sections
    const sections = [homeSection, reportSection, alertsSection, engagementSection, loginSection];
    sections.forEach(function(sec) {
      sec.style.display = 'none';
    });

    // Show the selected section
    section.style.display = 'block';
  }
});
