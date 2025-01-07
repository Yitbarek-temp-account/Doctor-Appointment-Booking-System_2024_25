function startEditing(field) {
  // Show the Save and Cancel buttons, hide the Edit button
  document.getElementById(field + "-buttons").classList.remove("d-none");
  document.getElementById(field + "-value").classList.add("d-none");
  document.getElementById(field + "-input").classList.remove("d-none");
  document.querySelector("#" + field + "-input").disabled = false;
  document.querySelector("#" + field + "-input").focus();

  // Hide the Edit button
  document.querySelector("#" + field + "-row button").classList.add("d-none");
}

function saveEdit(field) {
  const updatedValue = document.getElementById(field + "-input").value;

  document.getElementById(field + "-value").textContent = updatedValue;

  document.getElementById(field + "-buttons").classList.add("d-none");
  document.getElementById(field + "-value").classList.remove("d-none");
  document.querySelector("#" + field + "-input").classList.add("d-none");
  document
    .querySelector("#" + field + "-row button")
    .classList.remove("d-none");

  document.querySelector("#" + field + "-input").disabled = true;
}

function cancelEdit(field) {
  const originalValue = document.getElementById(field + "-value").textContent;
  document.getElementById(field + "-input").value = originalValue;

  document.getElementById(field + "-buttons").classList.add("d-none");
  document.getElementById(field + "-value").classList.remove("d-none");
  document.querySelector("#" + field + "-input").classList.add("d-none");
  document
    .querySelector("#" + field + "-row button")
    .classList.remove("d-none");

  document.querySelector("#" + field + "-input").disabled = true;
}
