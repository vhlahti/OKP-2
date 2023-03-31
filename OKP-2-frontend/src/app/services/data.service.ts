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

  issUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

  getActivities() {
    return this.http.get(this.apiUrl + "activities?limit=3")
  }

  getEvents() {
    return this.http.get(this.apiUrl + "events?limit=3")
  }

  getPlaces() {
    return this.http.get(this.apiUrl + "places?limit=3")
  }

  getISS() {
    return this.http.get(this.issUrl);
  }

}
