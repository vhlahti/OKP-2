import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Event } from 'src/app/models/helsinki-api-model';
import { APIResponse } from 'src/app/models/IApiResponse';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
    events: Event[];

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.getEventsData();
    }

    getEventsData() {
        this.dataService.getEvents().subscribe((res: APIResponse) => {
            let result = JSON.parse(res.data.result);
            this.events = result.data;
        });
    }

    getEvent(event: Event) {
        return event.name.fi ?? event.name.en;
    }
}
