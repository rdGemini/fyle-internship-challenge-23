import { Component, Input } from '@angular/core';
import { Repository } from './repository.model';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent {
  @Input()
  repositories!: Repository[];
}
