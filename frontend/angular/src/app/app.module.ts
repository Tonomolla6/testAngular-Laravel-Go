import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";  //Para en ngFor
import { NgModule } from '@angular/core';
import { CoreModule } from './core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pagina principal
import { HomeModule } from './home/home.module';

// Discoteca
import { DiscotecaModule } from './discoteca/discoteca.module';

// Login y register
import { AuthModule } from './auth/auth.module';

// Componentes globales
import { HeaderComponent } from './component/layout/header/header.component';
import { FooterComponent } from './component/layout/footer/footer.component';

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
    AuthModule,
    DiscotecaModule,
    CoreModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [], //////////////////////////
  bootstrap: [AppComponent]
})
export class AppModule { }
