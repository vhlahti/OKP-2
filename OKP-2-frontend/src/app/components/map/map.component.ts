import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  // google maps settings
  zoom = 13;
  height = '400px';
  width = '100%';
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    // additional settings here
  };

  // marker settings
  userCurrentLocation = false;

  constructor() {}

  ngOnInit(): void {
    // set helsinki city center as default location
    this.center = { lat: 60.172727, lng: 24.939491 };

    // get user's current location and keep track of it via geolocation api
    this.getUserLocation();

    // repeat getUserLocation every 1000 milliseconds
    setInterval(this.getUserLocation, 1000);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // update #userMarker visibility
        this.userCurrentLocation = true;
      },
      (error) => {
        console.log('Error getting user location:', error.message);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
}