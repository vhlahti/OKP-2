import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DataService } from './services/data.service';
import { ListActivitiesComponent } from './components/list-activities/list-activities.component';
import { ListPlacesComponent } from './components/list-places/list-places.component';
import { ListEventsComponent } from './components/list-events/list-events.component';
import { SharedService } from './services/shared.service';
import { WeatherComponent } from './components/weather/today.component';
import { ForecastService } from './services/forecast.service';
import { AccountService } from './services/account.service';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FooterComponent,
    HeaderComponent,
    ListActivitiesComponent,
    ListPlacesComponent,
    ListEventsComponent,
    WeatherComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    GoogleMapsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataService, SharedService, ForecastService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
