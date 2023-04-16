import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Event } from 'src/app/models/helsinki-api-model';
import { APIResponse } from 'src/app/models/IApiResponse';
import { ILocation } from 'src/app/models/ILocation';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {

    events: Event[] = [];
    eventLocations: ILocation[] = [];

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.getEventsData();
    }

    getEventsData() {
        this.dataService.getEvents().subscribe((res: APIResponse) => {
            let result = JSON.parse(res.data.result);
            this.events = result.data;
            console.log(this.events);

            // fetch the location coordinates and push them to an array
            for (const event of this.events) {
            const { lat, lon } = event.location;
            this.eventLocations.push({ position: { lat, lng: lon } });
            }
            console.log(this.eventLocations);
        });
    }

    getEvent(event: Event) {
        return event.name.fi ?? event.name.en;
    }

}
