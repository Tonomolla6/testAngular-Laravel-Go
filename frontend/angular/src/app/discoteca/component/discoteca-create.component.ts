import { Component, OnInit } from '@angular/core';
import { DiscotecasService } from '../../core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-discoteca-create',
  templateUrl: './discoteca-create.component.html',
  styleUrls: ['./discoteca-create.component.css']
})
export class DiscotecaCreateComponent implements OnInit {
  discoForm: FormGroup;

  constructor(      
    private discotecasService: DiscotecasService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
      this.discoForm = this.fb.group({
        'name': ['', Validators.required],
        'description': ['', Validators.required],
        'location': ['', Validators.required],
        'postal': new FormControl()
      }); 
    }

  ngOnInit() {
  }

  submitDisco() {
    console.log("type of")
    console.log(typeof(this.discoForm.value));
    console.log(typeof({}))
    
    this.discotecasService.createDiscoteca(this.discoForm.value)
    .subscribe(
      data => {
        this.toastr.success("Discoteca creada!");
        // this.router.navigateByUrl('/profile/discotecas');
      },
      err => this.toastr.error(err.errors)
    );
  }
}