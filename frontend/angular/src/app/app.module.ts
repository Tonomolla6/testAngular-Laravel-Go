import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscotecaComponent } from './discoteca/discoteca.component';
import { HomeComponent } from './home/home.component';
import {
  FooterComponent,
  HeaderComponent
} from './shared';
// import { SharedModule } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    DiscotecaComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent
    // SharedModule
  ], //Cuidado con las declarations y los imports
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
