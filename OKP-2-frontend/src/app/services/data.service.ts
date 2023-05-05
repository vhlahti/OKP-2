import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { APIResponse } from 'src/app/models/IApiResponse';
import { ActivityV2 } from 'src/app/models/helsinki-api-model';
import { Event } from 'src/app/models/helsinki-api-model';
import { PlaceV2 } from 'src/app/models/helsinki-api-model';
import { ILocation } from 'src/app/models/ILocation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  activities: ActivityV2[] = [];
  activityLocations: ILocation[] = [];
  events: Event[] = [];
  eventLocations: ILocation[] = [];
  places: PlaceV2[] = [];
  placeLocations: ILocation[] = [];

  constructor(private http: HttpClient) { }

  // filter settings

  lat: number;
  lng: number;
  distance = 1; // distance radius from user location
  limit = 50; // limits shown results. use: &limit=${this.limit}

  apiUrl = environment.apiUrl;
 
  // update default location with chosen coordinates
  updateUserLocation(newLat: number, newLng: number) {
    this.lat = newLat;
    this.lng = newLng;
  }

  private filterPath(): string {
    if (!this.lat || !this.lng) {
      // lat and/or lng not set yet, return empty filter path
      return '';
    }
    return `?distance_filter=${this.lat},${this.lng},${this.distance}&limit=${this.limit}`;
  }

  getActivities() {
    return this.http.get(this.apiUrl + "activities" + this.filterPath())
  }

  getEvents() {
    return this.http.get(this.apiUrl + "events" + this.filterPath())
  }

  getPlaces() {
    return this.http.get(this.apiUrl + "places" + this.filterPath())
  }

  getActivitiesData() {
    this.getActivities().subscribe((res: APIResponse) => {
        let result = JSON.parse(res.data.result);
        this.activities = result.rows;
        console.log("Activities");
        console.log(this.activities);

        // filter results and push selected data to additional array
        for (const activity of this.activities) {
            const { lat, long } = activity.address?.location ?? {};
            const name = activity.descriptions["fi"]?.name ?? activity.descriptions["en"]?.name;
            const { streetName, postalCode, city } = activity.address;
            const image = activity.media[0]?.originalUrl;
            const url = activity.storeUrl;
            const about = activity.descriptions["fi"]?.description ?? activity.descriptions["en"]?.description;
            const tags = activity.tags;
            this.activityLocations.push({
              position: { lat, lng: long },
              name,
              address: { street_address: streetName, postal_code: postalCode, city},
              image,
              url,
              about,
              tags
            });
            }
            console.log(this.activityLocations);
    });
  }

  getEventsData() {
    this.getEvents().subscribe((res: APIResponse) => {
        let result = JSON.parse(res.data.result);
        this.events = result.data;
        console.log("Events");
        console.log(this.events);

        // filter results and push selected data to additional array
        for (const event of this.events) {
        const { lat, lon } = event.location ?? {};
        const name = event.name.fi ?? event.name.en;
        const { street_address, postal_code, locality } = event.location.address;
        const image = event.description.images.length > 0 ? event.description.images[0].url : null;
        const url = event.info_url;
        const about = event.description.intro;
        const tags = event.tags.map(tag => tag.name);
        this.eventLocations.push({
          position: { lat, lng: lon },
          name,
          address: { street_address, postal_code, city: locality},
          image,
          url,
          about,
          tags
        });
        }
        console.log(this.eventLocations);
    });
  }

  getPlacesData() {
    this.getPlaces().subscribe((res: APIResponse) => {
        let result = JSON.parse(res.data.result);
        this.places = result.data;
        console.log("Places");
        console.log(this.places);

        // filter results and push selected data to additional array
        for (const place of this.places) {
            const { lat, lon } = place.location ?? {};
            const name = place.name.fi ?? place.name.en;
            const { street_address, postal_code, locality } = place.location.address;
            // const image = place.description.images[0].url;
            const image = place.description.images.length > 0 ? place.description.images[0].url : null;
            const url = place.info_url;
            const about = place.description.intro;
            const tags = place.tags.map(tag => tag.name);
            this.placeLocations.push({
              position: { lat, lng: lon },
              name,
              address: { street_address, postal_code, city: locality},
              image,
              url,
              about,
              tags
            });
            }
            console.log(this.placeLocations);
    });
  }

}
