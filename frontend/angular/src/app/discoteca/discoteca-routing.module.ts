import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscotecaComponent } from './component/discoteca.component';
import { DiscotecaCreateComponent } from './component/discoteca-create.component';
import { DiscotecaDetailsComponent } from './component/discoteca-details.component';
import { DiscotecaResolver} from './component/discoteca-resolver.service'
// import { DiscotecaAuthResolver } from './discoteca-auth-resolver.service';

const routes: Routes = [
  {
    path: 'discotecas',
    component: DiscotecaComponent,
    // resolve: {
    //   isAuthenticated: DiscotecaAuthResolver
    // }
  },
  {
    path: 'discoteca/create',
    component: DiscotecaCreateComponent
  },
  {
    path: 'discoteca/:id',
    component: DiscotecaDetailsComponent, //DiscotecaDetailsComponent
    resolve:{
      discoteca: DiscotecaResolver
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscotecaRoutingModule {}
