// Cosas de angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Cosas nuestras
import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  // Importa los componentes de los modulos que necesita
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  // Componentes del modulo (home).
  declarations: [
    HomeComponent
  ],
  // Servicios que pueden utilizar otros componentes de la aplicacion.
  providers: [
    HomeAuthResolver
  ]
})

export class HomeModule {}