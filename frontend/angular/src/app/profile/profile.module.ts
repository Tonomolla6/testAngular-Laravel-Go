import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './component/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportsComponent } from './component/reports.component';

@NgModule({
  declarations: [ProfileComponent, ReportsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder
  ]
})
export class ProfileModule { }