// Cosas de angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { DiscotecaComponent } from './component/discoteca.component';
import { DiscotecaPreviewComponent } from './component/discoteca-preview.component';
import { DiscotecaRoutingModule } from './discoteca-routing.module';

@NgModule({
  declarations: [
    DiscotecaComponent,
    DiscotecaPreviewComponent
  ],
  imports: [
    DiscotecaRoutingModule,
    CommonModule
  ]
})

export class DiscotecaModule {}