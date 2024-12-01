// AI Analytics - Example for Clinic Analytics Section
document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("clinicChart").getContext("2d");
  
    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Routine Checkups", "Urgent Cases", "Follow-Ups"],
        datasets: [{
          data: [60, 25, 15],
          backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          }
        }
      }
    });
  });
  