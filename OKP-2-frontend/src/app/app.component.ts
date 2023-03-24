import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OKP-2-frontend';

  // google maps settings

  options: google.maps.MapOptions = {
    center: {lat: 60.172727, lng: 24.939491},
    zoom: 13
  };

}
