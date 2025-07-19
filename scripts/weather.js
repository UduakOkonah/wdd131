// ----- Footer Info -----
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ----- Wind Chill Calculation -----
function calculateWindChill(tempF, speedMph) {
  return (
    35.74 +
    0.6215 * tempF -
    35.75 * Math.pow(speedMph, 0.16) +
    0.4275 * tempF * Math.pow(speedMph, 0.16)
  ).toFixed(1); // Round to 1 decimal place
}

const temp = 40; // Static temperature in °F
const speed = 10; // Static wind speed in mph

let windchillElement = document.getElementById("windchill");

if (temp <= 50 && speed > 3) {
  const windChill = calculateWindChill(temp, speed);
  windchillElement.textContent = `${windChill} °F`;
} else {
  windchillElement.textContent = "N/A";
}
