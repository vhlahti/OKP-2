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
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FooterComponent,
    HeaderComponent,
    ListActivitiesComponent,
    ListPlacesComponent,
    ListEventsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    GoogleMapsModule,
    FontAwesomeModule
  ],
  providers: [DataService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
