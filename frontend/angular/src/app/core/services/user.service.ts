import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map ,  distinctUntilChanged } from 'rxjs/operators';


@Injectable()


export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    console.log("populate");

    let token = this.jwtService.getToken();
    console.log("admin@gmail.com");
    if (token) {
      this.apiService.usersCheckToken('/user/logued', token)
      .subscribe(
        data => {
          data.User.Bearer = token;
          this.setAuth(data.User);
        },
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    console.log("setAuth");
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.Bearer);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    console.log("cerrando sesion");
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type:String, credentials:[]): Observable<User> {
    const route = (type === 'login') ? 'login' : '';
    console.log(credentials);
    return this.apiService.usersPost('/users/' + route, {user: credentials})
      .pipe(map(
      data => {

        console.log("User service----")
        console.log(data)

        if(data.user.type=="admin"){//Es administrador
          console.log("ADMIN OLE LOS CARACOLES")
          this.loginLaravel(credentials).subscribe(data =>{ console.log(data)});
          console.log("Despues")
        }else{//Es usuario normal
          this.setAuth(data.user);
        }
        
        

        return data;
      }
    ));
  }

  //Login en laravel admin
  loginLaravel(credentials:[]): Observable<User> {
    // console.log("Login de laravel");
    return this.apiService.loginLaravel('/users/login', {user: credentials})
    .pipe(map(
      data => {
        this.setAuth(data.user);
        return data;
      }
    ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user:User): Observable<User>  {   //Originalmente-> (user): Observable<User>
    return this.apiService
    .put('/user/', { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

}
