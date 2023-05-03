import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivityV2 } from 'src/app/models/helsinki-api-model';
import { APIResponse } from 'src/app/models/IApiResponse';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.css'],
})
export class ListActivitiesComponent implements OnInit {
  activities: ActivityV2[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getActivitiesData();
  }

  getActivitiesData() {
    this.dataService.getActivities().subscribe((res: APIResponse) => {
      let result = JSON.parse(res.data.result);
      this.activities = result.rows;
    });
  }

  getActivityName(activity: ActivityV2) {
    return (
      activity.descriptions['fi']?.name ?? activity.descriptions['en']?.name
    );
  }
  getActivityDescription(activity: ActivityV2) {
    let description = activity.descriptions['fi']?.description ?? activity.descriptions['en']?.description;
    return description.replace(/<\/?[^>]+(>|$)/g, '');
  }
  getActivityHasLink(activity: ActivityV2) {
    return !!activity;
  }
  getActivityLink(activity: ActivityV2) {
    return activity;
  }
}
