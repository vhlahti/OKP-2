import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Event } from 'src/app/models/helsinki-api-model';
import { APIResponse } from 'src/app/models/IApiResponse';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css'],
})
export class ListEventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private dataService: DataService) {
    this.events = dataService.events;
  }

  ngOnInit(): void {}

  getEventName(event: Event) {
    return event.name.fi ?? event.name.en;
  }
  getEventDescription(event: Event) {
    return event.description.body.replace(/<\/?[^>]+(>|$)/g, '');
  }
  getEventHasLink(event: Event) {
    // Convert to boolean
    return !!event.info_url;
  }

  getEventLink(event: Event) {
    return event.info_url;
  }

}
