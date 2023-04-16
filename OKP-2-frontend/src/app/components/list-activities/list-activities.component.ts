import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivityV2 } from 'src/app/models/helsinki-api-model';
import { APIResponse } from 'src/app/models/IApiResponse';
import { ILocation } from 'src/app/models/ILocation';

@Component({
    selector: 'app-list-activities',
    templateUrl: './list-activities.component.html',
    styleUrls: ['./list-activities.component.css']
})
export class ListActivitiesComponent implements OnInit {

    activities: ActivityV2[] = [];
    activitityLocations: ILocation[] = [];

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.getActivitiesData();
    }

    getActivitiesData() {
        this.dataService.getActivities().subscribe((res: APIResponse) => {
            let result = JSON.parse(res.data.result);
            this.activities = result.rows;
            console.log(this.activities);

            // fetch the location coordinates and push them to an array
            for (const activity of this.activities) {
                const { lat, long } = activity.address.location;
                this.activitityLocations.push({ position: { lat, lng: long } });
                }
                console.log(this.activitityLocations);
        });
    }

    getActivity(activity: ActivityV2) {
        return activity.descriptions["fi"]?.name ?? activity.descriptions["en"]?.name;
    }
}
