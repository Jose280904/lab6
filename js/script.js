const locationSelect = document.getElementById("locationSelect");
const getDataBtn = document.getElementById("getDataBtn");

getDataBtn.addEventListener("click", function () {
  const selectedLocation = locationSelect.value;

  // Check if user selected something
  if (selectedLocation === "") {
    alert("Please select a location first.");
    return;
  }

  // Split "lat,lng"
  const [lat, lng] = selectedLocation.split(",");

  console.log("Latitude:", lat);
  console.log("Longitude:", lng);
});