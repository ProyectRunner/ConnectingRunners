
  function initMap() {
var eventPosition = {lat: mapevent.lat, lng: mapevent.log};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: eventPosition
  });

  var marker = new google.maps.Marker({
    position: eventPosition,
    map: map,
    icon: ("/images/favicon.ico"),
    title: 'Connecting Runners Event'
  });
}
initMap();
