import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscotecaComponent } from './discoteca/discoteca.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
// import {  }
// import { SharedModule } from './shared';
import {
  FooterComponent,
  HeaderComponent
  // SharedModule
} from './shared';
import { CoreModule } from './core';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ], //Cuidado con las declarations y los imports
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
