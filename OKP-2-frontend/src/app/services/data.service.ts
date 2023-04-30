import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // filter settings

  lat = 60.172727; // helsinki city center as default location
  lng = 24.939491; // helsinki city center as default location
  distance = 0.5; // distance radius from user location
  limit = 50; // limits shown results if limitPath is used

  apiUrl = 'https://localhost:7266/api/';
  filterPath = `?distance_filter=${this.lat},${this.lng},${this.distance}`;
  limitPath = `?&limit=${this.limit}`; // optional

  // update default location with chosen coordinates
  updateUserLocation(newLat: number, newLng: number) {
    this.lat = newLat;
    this.lng = newLng;
  }

  getActivities() {
    return this.http.get(this.apiUrl + "activities" + this.filterPath)
  }

  getEvents() {
    return this.http.get(this.apiUrl + "events" + this.filterPath)
  }

  getPlaces() {
    return this.http.get(this.apiUrl + "places" + this.filterPath)
  }
}