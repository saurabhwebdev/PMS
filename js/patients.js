// Get patients
function getPatients() {
  db.collection('patients').get().then((querySnapshot) => {
    const patientsList = document.getElementById('patientsList');
    patientsList.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const patient = doc.data();
      const row = `
        <tr>
          <td>${patient.name}</td>
          <td>${patient.email}</td>
          <td>${patient.phone}</td>
          <td>
            <button class="btn btn-sm btn-info" onclick="editPatient('${doc.id}')">Edit</button>
            <button class="btn btn-sm btn-error" onclick="deletePatient('${doc.id}')">Delete</button>
          </td>
        </tr>
      `;
      patientsList.innerHTML += row;
    });
  }).catch(error => {
    console.error("Error getting patients: ", error);
  });
}

// Add patient
function addPatient() {
  const name = document.getElementById('patientName').value;
  const email = document.getElementById('patientEmail').value;
  const phone = document.getElementById('patientPhone').value;

  db.collection('patients').add({
    name: name,
    email: email,
    phone: phone
  })
  .then(() => {
    closeAddPatientModal();
    getPatients();
  })
  .catch((error) => {
    console.error("Error adding patient: ", error);
  });
}

// Edit patient
function editPatient(id) {
  // Implement edit functionality
}

// Delete patient
function deletePatient(id) {
  db.collection('patients').doc(id).delete().then(() => {
    getPatients();
  }).catch((error) => {
    console.error("Error removing patient: ", error);
  });
}

// Modal functions
function openAddPatientModal() {
  document.getElementById('add_patient_modal').showModal();
}

function closeAddPatientModal() {
  document.getElementById('add_patient_modal').close();
}

// Load patients when the page is ready
document.addEventListener('DOMContentLoaded', getPatients);