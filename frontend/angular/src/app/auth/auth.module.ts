import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './component/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { UserService } from '../core/services/user.service';
import { JwtService } from '../core/services/jwt.service';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers:[UserService,JwtService,FormBuilder],
})

export class AuthModule { }