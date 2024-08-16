// Update dashboard statistics
function updateDashboardStats() {
  // Total Patients
  db.collection('patients').get().then((snapshot) => {
    document.getElementById('totalPatients').textContent = snapshot.size;
  }).catch(error => {
    console.error("Error getting total patients: ", error);
  });

  // Upcoming Appointments
  const today = new Date().toISOString().split('T')[0];
  db.collection('appointments')
    .where('date', '>=', today)
    .get().then((snapshot) => {
      document.getElementById('upcomingAppointments').textContent = snapshot.size;
    }).catch(error => {
      console.error("Error getting upcoming appointments: ", error);
    });

  // New Patients This Month
  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
  db.collection('patients')
    .where('createdAt', '>=', firstDayOfMonth)
    .get().then((snapshot) => {
      document.getElementById('newPatients').textContent = snapshot.size;
    }).catch(error => {
      console.error("Error getting new patients: ", error);
    });
}

// Get upcoming appointments
function getUpcomingAppointments() {
  const today = new Date().toISOString().split('T')[0];
  db.collection('appointments')
    .where('date', '>=', today)
    .orderBy('date')
    .limit(5)
    .get().then((querySnapshot) => {
      const appointmentsList = document.getElementById('appointmentsList');
      appointmentsList.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const appointment = doc.data();
        const row = `
          <tr>
            <td>${appointment.patientName}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
          </tr>
        `;
        appointmentsList.innerHTML += row;
      });
    }).catch(error => {
      console.error("Error getting upcoming appointments: ", error);
    });
}

// Update dashboard when the page is ready
document.addEventListener('DOMContentLoaded', () => {
  updateDashboardStats();
  getUpcomingAppointments();
});