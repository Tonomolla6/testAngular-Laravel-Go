import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './component/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { UserService } from '../core/services/user.service';
import { JwtService } from '../core/services/jwt.service';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule
    // BrowserAnimationsModule,
    // ToastrModule.forRoot(),
  ],
  providers:[UserService,JwtService,FormBuilder]
  // bootstrap: [App],
  // declarations: [App],
})

export class AuthModule { }