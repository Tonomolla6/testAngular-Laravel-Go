// Cosas de angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Cosas nuestras
import { HomeComponent } from './component/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeSliderComponent } from './component/home-slider/home-slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  // Importa los modulos que necesita
  declarations: [
    HomeComponent,
    HomeSliderComponent,
  ],

  // Componentes del modulo (home).
  imports: [
    HomeRoutingModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot(),
  ]

  // Servicios que pueden utilizar otros componentes de la aplicacion.
//   providers: [
//     HomeAuthResolver
//   ]
})

export class HomeModule {}