import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listing: any = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.getIssData();
    this.getPlacesData();
  }

  getIssData() {
    this.dataService.getISS().subscribe((res) => {
      this.listing = res;
      console.log(this.listing);
    });
  }

  getPlacesData() {
    this.dataService.getActivities().subscribe((res) => {
      this.listing = res;
      console.log(this.listing);
    });
  }

}
