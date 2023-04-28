import { Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class WeatherComponent implements OnInit{
  timeline = [];
  weatherNow: any;
  location:any;
  currentTime = new Date();

  constructor(private forecastService: ForecastService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.forecastService.getWeatherForecast().subscribe(data=>{
      this.getTodayForecast(data)
    })
  }

  dateRange() {
    const start = new Date();
    start.setHours(start.getHours()+(start.getTimezoneOffset() / 60));
    const to = new Date(start);
    to.setHours(to.getHours() +2, to.getMinutes() + 59, to.getSeconds() + 59);

    return { start, to }
  }
  getTodayForecast(today:any){
    this.location = today.city;

    for (const forecast of today.list.slice(0, 3)) {
      this.timeline.push({
        time:forecast.dt_txt,
        temp: forecast.main.temp
      })

      const apiDate = new Date(forecast.dt_txt).getTime();

      if(this.dateRange().start.getTime() <= apiDate && this.dateRange().to.getTime() >= apiDate){
        this.weatherNow  = forecast;
      }
    }
    
  }

  
}