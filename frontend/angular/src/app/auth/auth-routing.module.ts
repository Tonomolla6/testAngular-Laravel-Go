import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './component/auth.component';
// import { HomeAuthResolver } from './home-auth-resolver.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent
    // resolve: {
    //   isAuthenticated: HomeAuthResolver
    // }
  },
  {
    path: 'singin',
    component: AuthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}