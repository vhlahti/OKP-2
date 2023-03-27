import { Component } from '@angular/core';
import { faBars, faMapLocationDot, faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faMapLocationDot = faMapLocationDot;
  faBars = faBars;
  faUser = faUser;

}
