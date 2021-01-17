// Cosas de angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { DiscotecaCreateComponent } from './component/discoteca-create.component';
import { DiscotecaComponent } from './component/discoteca.component';
import { DiscotecaDetailsComponent } from './component/discoteca-details.component';
import { DiscotecaPreviewComponent } from './component/discoteca-preview.component';
import { DiscotecaResolver } from './component/discoteca-resolver.service';
import { DiscotecaRoutingModule } from './discoteca-routing.module';
import { FormBuilder } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DiscotecaComponent,
    DiscotecaDetailsComponent,
    DiscotecaPreviewComponent,
    DiscotecaCreateComponent
  ],
  imports: [
    DiscotecaRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    DiscotecaResolver,FormBuilder
  ]
})

export class DiscotecaModule {}