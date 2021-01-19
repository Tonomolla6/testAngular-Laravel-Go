import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './component/profile.component';
import { ReportsComponent } from './component/reports.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
    // resolve: {
    //   isAuthenticated: DiscotecaAuthResolver
    // }
  },
  {
    path: 'profile/reports',
    component: ReportsComponent
    // resolve: {
    //   isAuthenticated: DiscotecaAuthResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
