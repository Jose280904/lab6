const locationSelect = document.getElementById("locationSelect");
const getDataBtn = document.getElementById("getDataBtn");
const errorMessage = document.getElementById("errorMessage");

getDataBtn.addEventListener("click", function () {
  const selectedLocation = locationSelect.value;

  errorMessage.textContent = "";

  if (selectedLocation === "") {
    errorMessage.textContent = "Please select a location first.";
    return;
  }

  const [lat, lng] = selectedLocation.split(",");

  getSunData(lat, lng, "today");
  getSunData(lat, lng, "tomorrow");
});

function getSunData(lat, lng, date) {
  const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=${date}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      if (data.status !== "OK") {
        errorMessage.textContent = "Error getting data. Try again.";
        return;
      }

      const r = data.results;

      document.getElementById(`${date}-sunrise`).textContent = r.sunrise;
      document.getElementById(`${date}-sunset`).textContent = r.sunset;
      document.getElementById(`${date}-dawn`).textContent = r.dawn;
      document.getElementById(`${date}-dusk`).textContent = r.dusk;
      document.getElementById(`${date}-noon`).textContent = r.solar_noon;
      document.getElementById(`${date}-length`).textContent = r.day_length;
      document.getElementById(`${date}-timezone`).textContent = r.timezone;
    })
    .catch(function () {
      errorMessage.textContent = "Could not connect to API.";
    });
}