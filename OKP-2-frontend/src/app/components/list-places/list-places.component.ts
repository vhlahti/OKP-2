import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PlaceV2 } from 'src/app/models/helsinki-api-model';
import { APIResponse } from 'src/app/models/IApiResponse';
import { ILocation } from 'src/app/models/ILocation';

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.css']
})
export class ListPlacesComponent implements OnInit {

    places: PlaceV2[] = [];
    placeLocations: ILocation[] = [];

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.getPlacesData();
    }

    getPlacesData() {
        this.dataService.getPlaces().subscribe((res: APIResponse) => {
            let result = JSON.parse(res.data.result);
            this.places = result.data;
            console.log(this.places);

            // fetch the location coordinates and push them to an array
            for (const place of this.places) {
                const { lat, lon } = place.location;
                this.placeLocations.push({ position: { lat, lng: lon } });
                }
                console.log(this.placeLocations);
        });
    }

    getPlace(place: PlaceV2) {
        return place.name.fi ?? place.name.en;
    }
}
