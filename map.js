var map = L.map('mapid').setView([55.778669, 37.596462], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([55.778669, 37.596462]).addTo(map)
    .bindPopup('Lao Lee')
    .openPopup();