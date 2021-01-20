import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  companyForm: FormGroup;

  constructor(      
    private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
      this.companyForm = this.fb.group({
        'name': ['', Validators.required],
        'nif': ['', Validators.required],
        'email': ['', Validators.required],
        'tel': new FormControl()
      }); 
    }

  ngOnInit() {
  }

  submitCompany() {
    console.log("type of")
    console.log(typeof(this.companyForm.value));
    console.log(typeof({}))
    
    this.companyService.createCompany(this.companyForm.value)
    .subscribe(
      data => {
        this.toastr.success("Compañia creada!");
        // this.router.navigateByUrl('/profile/discotecas');
      },
      err => this.toastr.error(err.errors)
    );
  }
}