document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Maps JS imported successfully!");
    console.log(center)
    // main.js
    function startMap() {
      const thisCenter = {
        lat: center.coordinates[0],
        lng: center.coordinates[1]
      };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: thisCenter
      });
      var marker = new google.maps.Marker({
        position: thisCenter,
        map: map
      });
    }
    startMap();
  },
  false
);