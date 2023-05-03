import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {
  faLandmark,
  faMasksTheater,
  faPersonBiking,
} from '@fortawesome/free-solid-svg-icons';
import { MapInfoWindow } from '@angular/google-maps';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  faLandmark = faLandmark;
  faPersonBiking = faPersonBiking;
  faMasksTheater = faMasksTheater;
  userTitle = 'Sijaintisi';
  selectedMarker: any;

  // switch case rules
  public showPlacesMarkers = true;
  public showActivitiesMarkers = false;
  public showEventsMarkers = false;

  // google maps settings
  zoom = 13;
  height = '400px';
  width = '100%';
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    center: { lat: 60.172727, lng: 24.939491 },
    maxZoom: 18,
    minZoom: 5,
  };

  // user marker settings
  userCurrentLocation = false;

  userMarkerOptions: google.maps.MarkerOptions = {
    //
  };

  // activity marker settings
  activityMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      path: faPersonBiking.icon[4] as string,
      fillColor: '#0000ff', // color of the marker
      fillOpacity: 1,
      anchor: new google.maps.Point(
        faPersonBiking.icon[0] / 2, // width
        faPersonBiking.icon[1] // height
      ),
      strokeWeight: 1,
      strokeColor: '#ffffff',
      scale: 0.06, // size of the marker
    },
  };

  // event marker settings
  eventMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      path: faMasksTheater.icon[4] as string,
      fillColor: '#8a2be2',
      fillOpacity: 1,
      anchor: new google.maps.Point(
        faMasksTheater.icon[0] / 2, // width
        faMasksTheater.icon[1] // height
      ),
      strokeWeight: 1,
      strokeColor: '#ffffff',
      scale: 0.06,
    },
  };

  // place marker settings
  placeMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      path: faLandmark.icon[4] as string,
      fillColor: '#d70909',
      fillOpacity: 1,
      anchor: new google.maps.Point(
        faLandmark.icon[0] / 2, // width
        faLandmark.icon[1] // height
      ),
      strokeWeight: 1,
      strokeColor: '#ffffff',
      scale: 0.06,
    },
  };

  // marker info window settings
  infoWindowOptions: google.maps.InfoWindowOptions = {
    // optional settings here
  };

  constructor(
    public dataService: DataService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    // get user's current location and keep track of it via geolocation api
    this.getUserLocation();

    // update #userMarker visibility
    this.userCurrentLocation = true;

    this.switchCase();
  }

  getUserLocation() {
    if (!navigator.geolocation)
      return console.log('Geolocation is not supported by this browser.');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.updateLocation();
        console.log(this.center);

        this.dataService.getActivitiesData();
        this.dataService.getEventsData();
        this.dataService.getPlacesData();
      },
      (error) => {
        console.log('Error getting user location:', error.message);
        // set helsinki city center as location if user denies geolocation
        this.center = { lat: 60.172727, lng: 24.939491 };
        this.updateLocation();
        console.log(this.center);

        this.dataService.getActivitiesData();
        this.dataService.getEventsData();
        this.dataService.getPlacesData();
      }
    );
  }

  openInfoWindow(marker, activity) {
    this.selectedMarker = activity;
    this.infoWindow.open(marker);
    this.zoomIn();

    // set zoom back to default when info window is closed
    this.infoWindow.closeclick.subscribe(() => {
      this.zoom = 13;
    });
  }

  switchCase() {
    this.sharedService.getCurrentCase().subscribe((caseValue) => {
      switch (caseValue) {
        case 'places':
          this.showPlacesMarkers = true;
          this.showActivitiesMarkers = false;
          this.showEventsMarkers = false;
          break;

        case 'activities':
          this.showPlacesMarkers = false;
          this.showActivitiesMarkers = true;
          this.showEventsMarkers = false;
          break;

        case 'events':
          this.showPlacesMarkers = false;
          this.showActivitiesMarkers = false;
          this.showEventsMarkers = true;
          break;

        default:
          break;
      }
    });
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  updateLocation() {
    // send user geolocation coordinates to data service
    const userLat = this.center.lat;
    const userLng = this.center.lng;
    this.dataService.updateUserLocation(userLat, userLng);
  }
}
