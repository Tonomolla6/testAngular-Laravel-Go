import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscotecaComponent } from './discoteca/discoteca.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
// import {  }
// import { SharedModule } from './shared';

@NgModule({
  declarations: [
    AppComponent
  ], //Cuidado con las declarations y los imports
  imports: [
    BrowserModule,
    // AppRoutingModule,
    // HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
