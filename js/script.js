const locationSelect = document.getElementById("locationSelect");
const getDataBtn = document.getElementById("getDataBtn");

getDataBtn.addEventListener("click", function () {
  const selectedLocation = locationSelect.value;

  if (selectedLocation === "") {
    alert("Please select a location first.");
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
      console.log(date, data);

      if (data.status !== "OK") {
        alert("Something went wrong getting the sunrise and sunset data.");
        return;
      }

      const results = data.results;

      document.getElementById(`${date}-sunrise`).textContent = results.sunrise;
      document.getElementById(`${date}-sunset`).textContent = results.sunset;
      document.getElementById(`${date}-dawn`).textContent = results.dawn;
      document.getElementById(`${date}-dusk`).textContent = results.dusk;
      document.getElementById(`${date}-noon`).textContent = results.solar_noon;
      document.getElementById(`${date}-length`).textContent = results.day_length;
      document.getElementById(`${date}-timezone`).textContent = results.timezone;
    })
    .catch(function (error) {
      console.log("Error:", error);
      alert("Could not connect to the sunrise and sunset API.");
    });
}