// let patients = JSON.parse(localStorage.getItem("patients")) || [];
// const tableBody = document.querySelector("#queueTable tbody");

// function renderTable() {
//     tableBody.innerHTML = "";
//     let cumulativeTime = 0;
  
//     patients.forEach((patient, index) => {
//       // The waiting time for the current patient is the cumulative time from previous patients.
//       patient.waitingTime = cumulativeTime;
//       cumulativeTime += patient.duration;
  
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${patient.id}</td>
//         <td>${patient.name}</td>
//         <td>${patient.waitingTime} mins</td>
//         <td>${patient.duration} mins</td>
//         <td><button onclick="cancelPatient(${patient.id})">Cancel</button></td>
//       `;
//       tableBody.appendChild(row);
//     });
  
//     // Save the updated patients array to localStorage
//     localStorage.setItem("patients", JSON.stringify(patients));
//   }
  

// function addNewPatient() {
//   const name = document.getElementById("newPatientName").value.trim();
//   const duration = parseInt(document.getElementById("newPatientDuration").value);

//   if (!name || isNaN(duration) || duration <= 0) {
//     alert("Please enter valid details.");
//     return;
//   }

//   const newPatient = {
//     id: patients.length > 0 ? patients[patients.length - 1].id + 1 : 1,
//     name,
//     duration,
//     waitingTime: 0,
//   };

//   patients.push(newPatient);
//   localStorage.setItem("patients", JSON.stringify(patients));
//   broadcastChange();
//   renderTable();

//   document.getElementById("newPatientName").value = "";
//   document.getElementById("newPatientDuration").value = "";
// }

// function cancelPatient(patientId) {
//   patients = patients.filter((p) => p.id !== patientId);
//   localStorage.setItem("patients", JSON.stringify(patients));
//   broadcastChange();
//   renderTable();
// }

// // Broadcast changes
// const channel = new BroadcastChannel("patients");
// function broadcastChange() {
//   channel.postMessage({ action: "update" });
// }

// // Listen for updates
// channel.onmessage = () => {
//   patients = JSON.parse(localStorage.getItem("patients")) || [];
//   renderTable();
// };

// // Initial rendering
// renderTable();


// Admin Page (admin.js)
const patients = JSON.parse(localStorage.getItem("patients")) || [];
const tableBody = document.getElementById("patientsTable");
const addPatientForm = document.getElementById("addPatientForm");

function predictDuration(medicalSituation) {
  // Example simple prediction based on keywords in the medical situation.
  const lowerCaseSituation = medicalSituation.toLowerCase();

  if (lowerCaseSituation.includes("filling")) {
    return 25; // Duration in minutes
  } else if (lowerCaseSituation.includes("cleaning")) {
    return 30;
  } else if (lowerCaseSituation.includes("extraction")) {
    return 45;
  } else if (lowerCaseSituation.includes("check-up")) {
    return 15;
  }
  // Default duration if no matching situation
  return 20;
}

function renderTable() {
  tableBody.innerHTML = "";
  let cumulativeTime = 0;

  patients.forEach((patient, index) => {
    // Update waiting time and duration
    patient.waitingTime = cumulativeTime;
    cumulativeTime += patient.duration;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${patient.id}</td>
      <td>${patient.name}</td>
      <td>${patient.medicalSituation}</td>
      <td>${patient.waitingTime} mins</td>
      <td>${patient.duration} mins</td>
      <td><button class="btn btn-danger btn-sm" onclick="cancelPatient(${patient.id})">Cancel</button></td>
    `;
    tableBody.appendChild(row);
  });

  // Save updated patients list
  localStorage.setItem("patients", JSON.stringify(patients));
}

function cancelPatient(patientId) {
  const patientIndex = patients.findIndex((patient) => patient.id === patientId);
  if (patientIndex !== -1) {
    patients.splice(patientIndex, 1);
    renderTable();
  }
}

// Handle form submission for adding a new patient
addPatientForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("patientName").value;
  const medicalSituation = document.getElementById("medicalSituation").value;

  const duration = predictDuration(medicalSituation);

  const newPatient = {
    id: patients.length ? patients[patients.length - 1].id + 1 : 1,
    name: name,
    medicalSituation: medicalSituation,
    waitingTime: 0,
    duration: duration
  };

  patients.push(newPatient);
  renderTable();

  // Reset the form
  addPatientForm.reset();
});

renderTable();
