import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

   // google maps settings

   options: google.maps.MapOptions = {
    center: {lat: 60.172727, lng: 24.939491},
    zoom: 13
  };

}
