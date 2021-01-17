import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './component/profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
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
