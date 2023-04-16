import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { APIResponse } from 'src/app/models/IApiResponse';
import { ActivityV2 } from 'src/app/models/helsinki-api-model';
import { Event } from 'src/app/models/helsinki-api-model';
import { PlaceV2 } from 'src/app/models/helsinki-api-model';
import { ILocation } from 'src/app/models/ILocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  activities: ActivityV2[] = [];
  activityLocations: ILocation[] = [];
  events: Event[] = [];
  eventLocations: ILocation[] = [];
  places: PlaceV2[] = [];
  placeLocations: ILocation[] = [];

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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // set helsinki city center as default location
    this.center = { lat: 60.172727, lng: 24.939491 };

    // get user's current location and keep track of it via geolocation api
    this.getUserLocation();

    // repeat getUserLocation every 1000 milliseconds
    setInterval(this.getUserLocation, 1000);

    this.getActivitiesData();
    this.getEventsData();
    this.getPlacesData();
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

  getActivitiesData() {
    this.dataService.getActivities().subscribe((res: APIResponse) => {
        let result = JSON.parse(res.data.result);
        this.activities = result.rows;
        console.log(this.activities);

        // fetch the location coordinates and push them to an array
        for (const activity of this.activities) {
            const { lat, long } = activity.address.location;
            this.activityLocations.push({ position: { lat, lng: long } });
            }
            console.log(this.activityLocations);
    });
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

  getPlacesData() {
    this.dataService.getPlaces().subscribe((res: APIResponse) => {
        let result = JSON.parse(res.data.result);
        this.places = result.data;
        console.log(this.places);

        // fetch the location coordinates and push them to an array
        for (const place of this.places) {
            const { lat, lon } = place.location;
            this.placeLocations.push({ position: { lat, lng: lon } });
            }
            console.log(this.placeLocations);
    });
  }

}