import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscotecaComponent } from './component/discoteca.component';
// import { DiscotecaAuthResolver } from './discoteca-auth-resolver.service';

const routes: Routes = [
  {
    path: 'discoteca',
    component: DiscotecaComponent,
    // resolve: {
    //   isAuthenticated: DiscotecaAuthResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscotecaRoutingModule {}
