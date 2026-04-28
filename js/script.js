const locationSelect = document.getElementById("locationSelect");
const getDataBtn = document.getElementById("getDataBtn");

getDataBtn.addEventListener("click", function () {
  const selectedLocation = locationSelect.value;

  if (selectedLocation === "") {
    alert("Please select a location first.");
    return;
  }

  const [lat, lng] = selectedLocation.split(",");

  getTodayData(lat, lng);
});

function getTodayData(lat, lng) {
  const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=today`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      if (data.status !== "OK") {
        alert("Something went wrong getting the sunrise and sunset data.");
        return;
      }

      const results = data.results;

      document.getElementById("today-sunrise").textContent = results.sunrise;
      document.getElementById("today-sunset").textContent = results.sunset;
      document.getElementById("today-dawn").textContent = results.dawn;
      document.getElementById("today-dusk").textContent = results.dusk;
      document.getElementById("today-noon").textContent = results.solar_noon;
      document.getElementById("today-length").textContent = results.day_length;
      document.getElementById("today-timezone").textContent = results.timezone;
    })
    .catch(function (error) {
      console.log("Error:", error);
      alert("Could not connect to the sunrise and sunset API.");
    });
}