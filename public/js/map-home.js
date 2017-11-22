function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.404841, lng: -3.709303},
    zoom: 12
  });
  var input = (document.getElementById('search-input'));

  var types = document.getElementById('type-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var eventosMarker = [
    ['Carrera de Aranjuez - 10K', 40.029924, -3.600024],
    ['San Silvestre Vallecana', 40.416729, -3.703667],
    ['Carrera el Retiro', 40.414803, -3.683974],
    ['Carrera Paseo La Castellana', 40.480544, -3.685036],
    ['El Corte', 40.116610, -3.718216],
    ['Comillas',40.399946, -3.714051],
    ['Maratón Ironhack', 40.392898, -3.698626],
    ['Movible', 0, 0],
  ];

  var infowindow = new google.maps.InfoWindow();

  for (var i = 0; i < eventosMarker.length; i++) {
      var marking = eventosMarker[i];
      var marker = new google.maps.Marker({
        position: {lat: marking[1], lng: marking[2]},
        map: map,
        icon: ("/images/favicon.ico"),
        title: marking[0],
        anchorPoint: new google.maps.Point(0, -29),
        draggable:true,
      });
    }

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    marker.setPosition(place.geometry.location);
    // marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

}
