import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  authForm: FormGroup;

  // Declaramos el route para obtener la url.
  constructor(
      private route: ActivatedRoute, 
      private userService: UserService,
      private fb: FormBuilder,
      private router: Router
    ) {
      this.authForm = this.fb.group({
        'email': ['',Validators.required],  //['',Validators.required] si lo ponemos asi el form es invalid siempre porque declaramos los campos como vacios
        'password': ['',Validators.required]
      });
      console.log("Despues del constructor");
      console.log(this.authForm)
      debugger
    }

  ngOnInit() {
    console.log("NG on init auth component")
    this.route.url.subscribe(data => {
      // Coger la url para ver si muestras un formulario o otro.
      this.authType = data[data.length - 1].path;
      console.log("THIS auth type")
      console.log(this.authType);
    });
  }

  submitForm() {
    // Ejecutamos el servicio de usuario para hacer login
    console.log("Submit form auth component")
    debugger
    const credentials = this.authForm.value;

    this.userService.attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/')
    );
  }
}
