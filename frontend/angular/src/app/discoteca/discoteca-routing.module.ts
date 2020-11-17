import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscotecaComponent } from './discoteca.component';
import { DiscotecaResolver } from './discoteca-resolver.service';

const routes: Routes = [
  {
    path: ':slug',
    component: DiscotecaComponent,
    resolve: {
      discoteca: DiscotecaResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscotecaRoutingModule {}
