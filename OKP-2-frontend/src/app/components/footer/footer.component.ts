import { Component } from '@angular/core';
import { faLandmark, faMasksTheater, faPersonBiking } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  faLandmark = faLandmark; 
  faPersonBiking = faPersonBiking;
  faMasksTheater = faMasksTheater;

  placesStatus = "block";
  activitiesStatus = "none";
  eventsStatus = "none";

  public clickHandler(label: string) {
    switch (label) {
      case "places":
        this.placesStatus = "block";
        this.activitiesStatus = "none";
        this.eventsStatus = "none";
        break;

      case "activities":
        this.placesStatus = "none";
        this.activitiesStatus = "block";
        this.eventsStatus = "none";
        break;

      case "events":
        this.placesStatus = "none";
        this.activitiesStatus = "none";
        this.eventsStatus = "block";
        break;
    
      default:
        break;
    }
  }
}


