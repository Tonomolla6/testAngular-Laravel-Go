// Cosas de angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiscotecaComponent } from './component/discoteca.component';
import { DiscotecaRoutingModule } from './discoteca-routing.module';

@NgModule({
  declarations: [
    DiscotecaComponent
  ],
  imports: [
    DiscotecaRoutingModule
  ]
})

export class DiscotecaModule {}