import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Place, PlaceV2 } from 'src/app/models/helsinki-api-model';
import { APIResponse } from 'src/app/models/IApiResponse';

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.css'],
})
export class ListPlacesComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {}

  getPlaceName(place: PlaceV2) {
    return place.name.fi ?? place.name.en;
  }

  getPlaceDescription(place: PlaceV2) {
    return place.description.body.replace(/<\/?[^>]+(>|$)/g, '');
  }

  getPlaceHasLink(place: PlaceV2) {
    return !!place.info_url;
  }

  getPlaceLink(place: PlaceV2) {
    return place.info_url;
  }
  
}
