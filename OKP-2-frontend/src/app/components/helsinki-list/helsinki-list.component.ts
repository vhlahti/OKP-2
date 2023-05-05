import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-helsinki-list',
    templateUrl: './helsinki-list.component.html',
    styleUrls: ['./helsinki-list.component.css']
})
export class HelsinkiListComponent {
    public selection: Observable<string>;

    constructor(public dataService: DataService, private sharedService: SharedService) { }

    ngOnInit() {
        this.selection = this.sharedService.getCurrentCase();
    }
}
