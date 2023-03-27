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
  width = '400px';
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    // additional settings here
  };

  constructor() {}

  ngOnInit(): void {
    // set helsinki city center as default location
    this.center = { lat: 60.172727, lng: 24.939491 };

    // get user's current location via geolocation api
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
}
