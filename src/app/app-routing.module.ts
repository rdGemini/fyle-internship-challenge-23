import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-details', pathMatch: 'full' },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'repository-list', component: RepositoryListComponent },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
