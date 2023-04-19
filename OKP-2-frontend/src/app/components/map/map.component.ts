import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { APIResponse } from 'src/app/models/IApiResponse';
import { ActivityV2 } from 'src/app/models/helsinki-api-model';
import { Event } from 'src/app/models/helsinki-api-model';
import { PlaceV2 } from 'src/app/models/helsinki-api-model';
import { ILocation } from 'src/app/models/ILocation';
import { faLandmark, faMasksTheater, faPersonBiking } from '@fortawesome/free-solid-svg-icons';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
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
  userTitle = "Sijaintisi";
  selectedMarker: any;

  // switch case rules
  public showPlacesMarkers = true;
  public showActivitiesMarkers = true;
  public showEventsMarkers = true;

  // api and coordinate data
  activities: ActivityV2[] = [];
  activityLocations: ILocation[] = [];
  events: Event[] = [];
  eventLocations: ILocation[] = [];
  places: PlaceV2[] = [];
  placeLocations: ILocation[] = [];

  // google maps settings
  zoom = 13;
  height = '400px';
  width = '100%';
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    maxZoom: 18,
    minZoom: 5
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
      fillColor: "#0000ff", // color of the marker
      fillOpacity: 1,
      anchor: new google.maps.Point(
        faPersonBiking.icon[0] / 2, // width
        faPersonBiking.icon[1] // height
      ),
      strokeWeight: 1,
      strokeColor: "#ffffff",
      scale: 0.060, // size of the marker
    }
  };

  // event marker settings
  eventMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      path: faMasksTheater.icon[4] as string,
      fillColor: "#8a2be2",
      fillOpacity: 1,
      anchor: new google.maps.Point(
        faMasksTheater.icon[0] / 2, // width
        faMasksTheater.icon[1] // height
      ),
      strokeWeight: 1,
      strokeColor: "#ffffff",
      scale: 0.060,
    }
  };

  // place marker settings
  placeMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      path: faLandmark.icon[4] as string,
      fillColor: "#d70909",
      fillOpacity: 1,
      anchor: new google.maps.Point(
        faLandmark.icon[0] / 2, // width
        faLandmark.icon[1] // height
      ),
      strokeWeight: 1,
      strokeColor: "#ffffff",
      scale: 0.060,
    }
  };

  // marker info window settings
  infoWindowOptions: google.maps.InfoWindowOptions = {
    // optional settings here
  }

  constructor(private dataService: DataService,
              private sharedService: SharedService) {}

  ngOnInit(): void {
    // set helsinki city center as default location
    this.center = { lat: 60.172727, lng: 24.939491 };

    // get user's current location and keep track of it via geolocation api
    this.getUserLocation();

    // repeat getUserLocation every 1000 milliseconds
    setInterval(this.getUserLocation, 1000);

    this.getActivitiesData();
    this.getEventsData();
    this.getPlacesData();
    this.switchCase()
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // update #userMarker visibility
        this.userCurrentLocation = true;
      },
      (error) => {
        console.log('Error getting user location:', error.message);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  getActivitiesData() {
    this.dataService.getActivities().subscribe((res: APIResponse) => {
        let result = JSON.parse(res.data.result);
        this.activities = result.rows;
        console.log(this.activities);

        // fetch the location coordinates and push them to an array
        for (const activity of this.activities) {
            const { lat, long } = activity.address.location;
            const name = activity.descriptions["fi"]?.name ?? activity.descriptions["en"]?.name;
            const { streetName, postalCode, city } = activity.address;
            const image = activity.media[0]?.originalUrl;
            const url = activity.storeUrl;
            const about = activity.descriptions["fi"]?.description ?? activity.descriptions["en"]?.description;
            const tags = activity.tags;
            this.activityLocations.push({
              position: { lat, lng: long },
              name,
              address: { street_address: streetName, postal_code: postalCode, city},
              image,
              url,
              about,
              tags
            });
            }
            console.log(this.activityLocations);
    });
  }

  getEventsData() {
    this.dataService.getEvents().subscribe((res: APIResponse) => {
        let result = JSON.parse(res.data.result);
        this.events = result.data;
        console.log(this.events);

        // fetch the location coordinates and push them to an array
        for (const event of this.events) {
        const { lat, lon } = event.location;
        const name = event.name.fi ?? event.name.en;
        const { street_address, postal_code, locality } = event.location.address;
        const image = event.description.images.length > 0 ? event.description.images[0].url : null;
        const url = event.info_url;
        const about = event.description.intro;
        const tags = event.tags.map(tag => tag.name);
        this.eventLocations.push({
          position: { lat, lng: lon },
          name,
          address: { street_address, postal_code, city: locality},
          image,
          url,
          about,
          tags
        });
        }
        console.log(this.eventLocations);
    });
  }

  getPlacesData() {
    this.dataService.getPlaces().subscribe((res: APIResponse) => {
        let result = JSON.parse(res.data.result);
        this.places = result.data;
        console.log(this.places);

        // fetch the location coordinates and push them to an array
        for (const place of this.places) {
            const { lat, lon } = place.location;
            const name = place.name.fi ?? place.name.en;
            const { street_address, postal_code, locality } = place.location.address;
            // const image = place.description.images[0].url;
            const image = place.description.images.length > 0 ? place.description.images[0].url : null;
            const url = place.info_url;
            const about = place.description.intro;
            const tags = place.tags.map(tag => tag.name);
            this.placeLocations.push({
              position: { lat, lng: lon },
              name,
              address: { street_address, postal_code, city: locality},
              image,
              url,
              about,
              tags
            });
            }
            console.log(this.placeLocations);
    });
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
    this.sharedService.getCurrentCase().subscribe(caseValue => {
      switch (caseValue) {
        case "places":
          this.showPlacesMarkers = true;
          this.showActivitiesMarkers = false;
          this.showEventsMarkers = false;
          break;
  
        case "activities":
          this.showPlacesMarkers = false;
          this.showActivitiesMarkers = true;
          this.showEventsMarkers = false;
          break;
  
        case "events":
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

}