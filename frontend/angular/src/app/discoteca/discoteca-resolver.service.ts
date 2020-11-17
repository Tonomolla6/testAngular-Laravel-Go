import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Discoteca, DiscotecasService, UserService } from '../core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DiscotecaResolver implements Resolve<Discoteca> {
  constructor(
    private discotecasService: DiscotecasService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.discotecasService.get(route.params['slug'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
