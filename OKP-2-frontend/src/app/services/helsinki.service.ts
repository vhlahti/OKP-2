import { Injectable } from '@angular/core';
import { ActivityV2, PlaceV2, Event } from '../models/helsinki-api-model';

type ApiData = PlaceV2 | ActivityV2 | Event;
type ApiTypes = "Places" | "Activities" | "Events"

@Injectable({
    providedIn: 'root'
})
export class HelsinkiService {

    constructor() { }

    getName(data: ApiData, type: ApiTypes) {
        let name: string;

        if (type == "Places") {
            let place = data as PlaceV2;
            name = place.name.fi ?? place.name.en;
        }
        else if (type == "Events") {
            let event = data as Event;
            name = event.name.fi ?? event.name.en;
        }
        else if (type == "Activities") {
            let activity = data as ActivityV2;
            name = activity.descriptions['fi']?.name ?? activity.descriptions['en']?.name;
        }
        
        return name;
    }

    getDescription(data: ApiData, type: ApiTypes) {
        let description: string;

        if (type == "Places") {
            let place = data as PlaceV2;
            description = place.description.body;
        }
        else if (type == "Events") {
            let event = data as Event;
            description = event.description.body;
        }
        else if (type == "Activities") {
            let activity = data as ActivityV2;
            description = activity.descriptions['fi']?.name ?? activity.descriptions['en']?.name;
        }
        
        return description.replace(/<\/?[^>]+(>|$)/g, '');
    }

    getLink(data: ApiData, type: ApiTypes) {
        let link: string;

        if (type == "Places") {
            let place = data as PlaceV2;
            link = place.info_url;
        }
        else if (type == "Events") {
            let event = data as Event;
            link = event.info_url;
        }
        else if (type == "Activities") {
            let activity = data as ActivityV2;
            link = activity.siteUrl;
        }
        
        return link;
    }

    hasLink(data: ApiData, type: ApiTypes) {
        return !!this.getLink(data, type);
    }

    getCoordinates(data: ApiData, type: ApiTypes) {
        let position: { lat?: number; lon?: number };
      
        if (type === "Places") {
          let place = data as PlaceV2;
          position = { lat: place.location?.lat, lon: place.location?.lon };
        } else if (type === "Events") {
          let event = data as Event;
          position = { lat: event.location?.lat, lon: event.location?.lon };
        } else if (type === "Activities") {
          let activity = data as ActivityV2;
          if (activity.address?.location) {
            const { lat, long } = activity.address.location;
            position = { lat, lon: long };
          } else {
            console.log('Ei sijaintitietoja.')
          }
        }
      
        return { lat: position.lat ?? 0, lon: position.lon ?? 0 };
      }
}
