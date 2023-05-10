import { Component, Input } from '@angular/core';
import { ActivityV2, PlaceV2, Event } from 'src/app/models/helsinki-api-model';
import { HelsinkiService } from 'src/app/services/helsinki.service';

type ApiData = PlaceV2 | ActivityV2 | Event;
type ApiTypes = "Places" | "Activities" | "Events"

@Component({
    selector: 'app-helsinki-list-item',
    templateUrl: './helsinki-list-item.component.html',
    styleUrls: ['./helsinki-list-item.component.css']
})
export class HelsinkiListItemComponent {
    @Input()
    public data: ApiData;

    @Input()
    public type: ApiTypes;

    constructor(public helsinkiService: HelsinkiService) { }
}
