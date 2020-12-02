// Cosas de angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Cosas nuestras
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';


@NgModule({
  // Importa los componentes de los modulos que necesita
  imports: [
    SharedModule
    // HomeRoutingModule
  ],
  // Componentes del modulo (home).
  declarations: [
    HomeComponent
  ],
  // Servicios que pueden utilizar otros componentes de la aplicacion.
//   providers: [
//     HomeAuthResolver
//   ]
})

export class HomeModule {}