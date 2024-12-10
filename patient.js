let patients = JSON.parse(localStorage.getItem("patients")) || [];

function getPatientDetails() {
  const patientId = parseInt(document.getElementById("patientId").value);
  const patient = patients.find((p) => p.id === patientId);

  const detailsDiv = document.getElementById("patientDetails");
  const cancelButton = document.getElementById("cancelAppointment");

  if (patient) {
    const position = patients.findIndex((p) => p.id === patientId);
    const patientsAhead = position; // Patients ahead in the queue

    detailsDiv.innerHTML = `
      <div class="patient-card">
        <h3 class="patient-name">
          <i class="fas fa-user-md"></i> ${patient.name}
        </h3>
        <ul class="patient-info">
          <li><i class="fas fa-clock"></i> <strong>Waiting Time:</strong> ${patient.waitingTime} minutes</li>
          <li><i class="fas fa-users"></i> <strong>Patients Ahead:</strong> ${patientsAhead}</li>
          <li><i class="fas fa-list-ol"></i> <strong>Position in Queue:</strong> ${
            patients.findIndex((p) => p.id === patientId) + 1
          }</li>
        </ul>
      </div>
    `;
    cancelButton.style.display = "inline-block";
  } else {
    detailsDiv.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i> Patient not found. Please check your ID.
      </div>
    `;
    cancelButton.style.display = "none";
  }
}



function cancelAppointment() {
  const patientId = parseInt(document.getElementById("patientId").value);
  patients = patients.filter((p) => p.id !== patientId);
  localStorage.setItem("patients", JSON.stringify(patients));
  broadcastChange();
  alert("Your appointment has been canceled.");
  document.getElementById("patientDetails").innerHTML = "";
  document.getElementById("cancelAppointment").style.display = "none";
}

// Broadcast changes
const channel = new BroadcastChannel("patients");
function broadcastChange() {
  channel.postMessage({ action: "update" });
}

// Listen for updates
channel.onmessage = () => {
  patients = JSON.parse(localStorage.getItem("patients")) || [];
};
