import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://localhost:4200/api/';

  getActivities() {
    // return this.http.get(this.apiUrl)
  }

  getEvents() {
    // return this.http.get(this.apiUrl)
  }

  getPlaces() {
    // return this.http.get(this.apiUrl)
  }

}
