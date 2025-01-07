document.addEventListener("DOMContentLoaded", function () {
  const appointmentButtons = document.querySelectorAll(
    '[data-bs-toggle="modal"]'
  );
  const appointmentForm = document.getElementById("appointmentForm");
  const appointmentModal = new bootstrap.Modal(
    document.getElementById("appointmentModal")
  );

  function handleFormSubmit(event) {
    event.preventDefault();

    const formData = {
      date: document.getElementById("date").value,
      startTime: document.getElementById("start-time").value,
      endTime: document.getElementById("end-time").value,
      disease: document.getElementById("disease").value,
    };

    if (Object.values(formData).every((value) => value)) {
      const appointments = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );
      appointments.push(formData);
      localStorage.setItem("appointments", JSON.stringify(appointments));

      alert("Appointment booked successfully!");

      appointmentForm.reset();
      appointmentModal.hide();
    } else {
      alert("Please fill out all fields before submitting.");
    }
  }

  appointmentForm.addEventListener("submit", handleFormSubmit);

  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
