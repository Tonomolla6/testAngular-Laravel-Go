import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// import { HomeComponent } from './home/home.component';
// import { HomeComponent } from './home/component/home.component';

const routes: Routes = [

];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Precargar todos los módulos
    // Podriamos especificar y elegir que modulos implementar.
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
