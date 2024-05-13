import { Component, Input } from '@angular/core';
import { UserDetails } from './user-details.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input()
  userDetails!: UserDetails;
}
