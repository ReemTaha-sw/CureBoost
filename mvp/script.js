// Example patient data
let patients = [
    { id: 1, name: "Ali Ahmed", waitingTime: 10, nextAppointment: "2024-12-05T10:00:00", duration: 15 },
    { id: 2, name: "Sara Khan", waitingTime: 25, nextAppointment: "2024-12-05T10:15:00", duration: 20 },
    { id: 3, name: "Zayed Mansoor", waitingTime: 45, nextAppointment: "2024-12-05T10:35:00", duration: 10 },
  ];
  
  // Populate Table
  function renderTable() {
    const tableBody = document.querySelector("#patientTable tbody");
    tableBody.innerHTML = ""; // Clear table
    
    patients.forEach((patient, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${patient.id}</td>
        <td>${patient.name}</td>
        <td>${calculateCumulativeWaitingTime(index)} mins</td>
        <td>${patient.duration} mins</td>
        <td><button onclick="cancelAppointment(${index})">Cancel</button></td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Calculate Cumulative Waiting Time
  function calculateCumulativeWaitingTime(index) {
    return patients
      .slice(0, index)
      .reduce((acc, patient) => acc + patient.duration, 0);
  }
  
  // Calculate Waiting Time for Specific Patient
  function calculateWaitTime() {
    const patientId = parseInt(document.getElementById("patientId").value);
    const resultDiv = document.getElementById("result");
  
    if (!patientId) {
      resultDiv.innerHTML = "Please enter a valid Patient ID.";
      return;
    }
  
    const patientIndex = patients.findIndex((p) => p.id === patientId);
    if (patientIndex === -1) {
      resultDiv.innerHTML = "Patient not found.";
      return;
    }
  
    const waitingTime = calculateCumulativeWaitingTime(patientIndex);
    resultDiv.innerHTML = `
      Hello ${patients[patientIndex].name}, <br>
      There are ${patientIndex} patient(s) ahead of you. <br>
      Your estimated waiting time is ${waitingTime} minutes.
    `;
  }
  
  // Cancel Appointment
  function cancelAppointment(index) {
    patients.splice(index, 1); // Remove patient from list
    renderTable(); // Re-render table
  }
  
  // Initialize Table on Load
  window.onload = renderTable;
  

  // Add a New Patient
function addNewPatient() {
    const nameInput = document.getElementById("newPatientName");
    const durationInput = document.getElementById("newPatientDuration");
  
    const name = nameInput.value.trim();
    const duration = parseInt(durationInput.value);
  
    if (!name || isNaN(duration) || duration <= 0) {
      alert("Please enter a valid name and duration.");
      return;
    }
  
    // Add new patient to the list
    const newPatient = {
      id: patients.length > 0 ? patients[patients.length - 1].id + 1 : 1, // Increment ID
      name: name,
      waitingTime: 0, // Initial waiting time, calculated dynamically
      nextAppointment: "", // Optional, not used in this demo
      duration: duration,
    };
  
    patients.push(newPatient); // Add to array
    renderTable(); // Re-render table
  
    // Clear input fields
    nameInput.value = "";
    durationInput.value = "";
  }
  