import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://localhost:7266/api/';

  getActivities() {
    return this.http.get(this.apiUrl + "activities?limit=15")
  }

  getEvents() {
    return this.http.get(this.apiUrl + "events?limit=15")
  }

  getPlaces() {
    return this.http.get(this.apiUrl + "places?limit=15")
  }
}