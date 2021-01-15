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
        'email': ['', Validators.required],
        'password': ['', Validators.required]
      });
    }

  ngOnInit() {
    console.log("NG on init auth component")
    this.route.url.subscribe(data => {
      // Coger la url para ver si muestras un formulario o otro.
      this.authType = data[data.length - 1].path;
      if (this.authType === 'signin') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }

  submitForm() {
    // Ejecutamos el servicio de usuario para hacer login
    console.log("Submit form auth component");
    const credentials = this.authForm.value;

    console.log(credentials);

    localStorage.setItem('email',credentials.email)
    this.userService.attemptAuth(this.authType, credentials)
    .subscribe(
      // data => this.router.navigateByUrl('/')
      (data) => {
        this.router.navigateByUrl('/')
      }
    );
  }
}
