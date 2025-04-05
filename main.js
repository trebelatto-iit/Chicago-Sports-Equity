// Initialize the Leaflet map
const map = L.map('map').setView([41.8781, -87.6298], 11);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Fetch and add markers for Chicago Public Sports Facilities
fetch("https://data.cityofchicago.org/resource/eix4-gf83.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(facility => {
      const loc = facility.location;
      if (loc && loc.latitude && loc.longitude) {
        const lat = parseFloat(loc.latitude);
        const lon = parseFloat(loc.longitude);
        const name = facility.facility_name || "Unnamed Facility";
        const park = facility.park_name || "Unknown Park";
        const type = facility.facility_type || "Unknown Type";

        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(
          `<strong>${name}</strong><br>Park: ${park}<br>Type: ${type}`
        );
      }
    });
  })
  .catch(err => {
    console.error("Error fetching facilities:", err);
  });
