import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faMapLocationDot, faUser } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    faMapLocationDot = faMapLocationDot;
    faBars = faBars;
    faUser = faUser;

    constructor(public accountService: AccountService, private router: Router) { }

    public logout() {
        this.accountService.logout();
        this.router.navigate(['/']);
    }
}
