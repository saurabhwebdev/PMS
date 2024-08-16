// Get appointments
function getAppointments() {
  db.collection('appointments').get().then((querySnapshot) => {
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const appointment = doc.data();
      const row = `
        <tr>
          <td>${appointment.patientName}</td>
          <td>${appointment.date}</td>
          <td>${appointment.time}</td>
          <td>
            <button class="btn btn-sm btn-info" onclick="editAppointment('${doc.id}')">Edit</button>
            <button class="btn btn-sm btn-error" onclick="deleteAppointment('${doc.id}')">Delete</button>
          </td>
        </tr>
      `;
      appointmentsList.innerHTML += row;
    });
  }).catch(error => {
    console.error("Error getting appointments: ", error);
  });
}

// Add appointment
function addAppointment() {
  const patientId = document.getElementById('patientSelect').value;
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;

  db.collection('patients').doc(patientId).get().then((doc) => {
    const patientName = doc.data().name;
    db.collection('appointments').add({
      patientId: patientId,
      patientName: patientName,
      date: date,
      time: time
    })
    .then(() => {
      closeAddAppointmentModal();
      getAppointments();
    })
    .catch((error) => {
      console.error("Error adding appointment: ", error);
    });
  }).catch(error => {
    console.error("Error getting patient: ", error);
  });
}

// Edit appointment
function editAppointment(id) {
  // Implement edit functionality
}

// Delete appointment
function deleteAppointment(id) {
  db.collection('appointments').doc(id).delete().then(() => {
    getAppointments();
  }).catch((error) => {
    console.error("Error removing appointment: ", error);
  });
}

// Modal functions
function openAddAppointmentModal() {
  populatePatientSelect();
  document.getElementById('add_appointment_modal').showModal();
}

function closeAddAppointmentModal() {
  document.getElementById('add_appointment_modal').close();
}

// Populate patient select
function populatePatientSelect() {
  const patientSelect = document.getElementById('patientSelect');
  patientSelect.innerHTML = '<option disabled selected>Select a patient</option>';
  db.collection('patients').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const patient = doc.data();
      const option = `<option value="${doc.id}">${patient.name}</option>`;
      patientSelect.innerHTML += option;
    });
  }).catch(error => {
    console.error("Error getting patients: ", error);
  });
}

// Load appointments when the page is ready
document.addEventListener('DOMContentLoaded', getAppointments);
