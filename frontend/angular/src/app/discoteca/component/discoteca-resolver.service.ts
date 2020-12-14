import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Discoteca, DiscotecasService} from '../../core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DiscotecaResolver implements Resolve<Discoteca> {
    constructor(
      private discotecasService: DiscotecasService,
      private router: Router,
    ) {}
  
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<any> {
  
        //This is getOne discoteca
        console.log("DISCOTECA RESOLVER")
        return this.discotecasService.get(route.params['id'])
        .pipe(catchError((err) => this.router.navigateByUrl('/')));  //Si hay error nos envia al home
    }
  }