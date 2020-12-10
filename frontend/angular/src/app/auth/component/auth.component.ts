import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: String = '';

  // Declaramos el route para obtener la url.
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Coger la url para ver si muestras un formulario o otro.
      this.authType = data[data.length - 1].path;
      console.log(this.authType);
    });
  }

  submitForm() {
    // Ejecutamos el servicio de usuario para hacer login

    // this.userService
    // .attemptAuth(this.authType, credentials)
    // .subscribe(
    //   data => this.router.navigateByUrl('/'),
    //   err => {
    //     this.errors = err;
    //     this.isSubmitting = false;
    //   }
    // );
  }
}
