import { Component, Input } from '@angular/core';
import { ActivityV2, PlaceV2, Event } from 'src/app/models/helsinki-api-model';
import { DataService } from 'src/app/services/data.service';
import { HelsinkiService } from 'src/app/services/helsinki.service';
import { faCircleInfo, faLocationDot } from '@fortawesome/free-solid-svg-icons';

type ApiData = PlaceV2 | ActivityV2 | Event;
type ApiTypes = "Places" | "Activities" | "Events"

@Component({
    selector: 'app-helsinki-list-item',
    templateUrl: './helsinki-list-item.component.html',
    styleUrls: ['./helsinki-list-item.component.css']
})
export class HelsinkiListItemComponent {

    faCircleInfo = faCircleInfo;
  faLocationDot = faLocationDot;

    textShow: boolean | undefined;
  showText(){
    this.textShow = true;
   }
   hideText(){
    this.textShow = false;
   }

    @Input()
    public data: ApiData;

    @Input()
    public type: ApiTypes;

    constructor(public helsinkiService: HelsinkiService,
                private dataService: DataService) { }

    showOnMap() {
        const resultPlaceLat = this.helsinkiService.getCoordinates(this.data, this.type).lat;
        const resultPlaceLng = this.helsinkiService.getCoordinates(this.data, this.type).lon;
        this.dataService.pan = { lat: resultPlaceLat, lng: resultPlaceLng };
        this.dataService.zoom = 17;
    }
}
