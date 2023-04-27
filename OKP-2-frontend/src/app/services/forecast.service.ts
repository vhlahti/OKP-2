import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  getWeatherForecast() {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          observer.next(position)
        },
        (error)=>{
          observer.next(error)
        }
      )
    }).pipe(
      map((value: any)=> {
        return new HttpParams()
          .set('lon', value.coords.longitude)
          .set('lat', value.coords.latitude)
          .set('units', 'metric')
          .set('lang', 'fi')
          .set('appid', '4e32001c1c9ed32f68e7f0d50543d0b5')
        
      }),
      switchMap((values)=>{
        return this.http.get('https://pro.openweathermap.org/data/2.5/forecast/hourly', {
          params: values})
      })
      
      )
    
  }
}
