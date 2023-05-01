import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // filter settings

  lat: number;
  lng: number;
  distance = 0.5; // distance radius from user location
  limit = 50; // limits shown results if limitPath is used

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
    return `?distance_filter=${this.lat},${this.lng},${this.distance}`;
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
}