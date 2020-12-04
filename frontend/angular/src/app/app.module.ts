import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pagina principal
import { HomeModule } from './home/home.module';

// Dsicoteca
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
    DiscotecaModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
