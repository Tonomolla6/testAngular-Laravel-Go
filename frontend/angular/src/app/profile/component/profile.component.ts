import { Component, Input, OnInit } from '@angular/core';
import { Profile, ProfileService } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {
  Discoteca,
  DiscotecasService
} from '../../core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()  
  discoteca?: Discoteca;  //? es para decirle que es opcional  
  results!: Discoteca[];
  // profileForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private discotecasService:DiscotecasService,
    private router:Router,
    private fb: FormBuilder

  ) {
    this.profileForm = this.fb.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'description': ['', Validators.required],
      'bio': ['', Validators.required]  //new FormControl()
    }); 

   }
   
   profileForm;

  

  ngOnInit(): void {
    // this.profileForm.controls.proof.patchValue(this.defaultValue);
    this.profileService.get().subscribe(data => { 

      this.profileForm = data.profile;
      console.log("pepe")
      console.log(data.profile)
    });

    //Aqui se le pasa el id del usuario al que le vamos a hacer la consulta
    // this.discotecasService.getDiscotecasByUser().subscribe(data => { 
    //   this.results = data.discotecas;
    // });
  }

  submitProfile() {
    console.log("Profile updated------2")
    // console.log(this.profileForm)
    console.log(this.profileForm)
    // let profileUpdated= {"name":this.profileForm.value}
    // console.log(profileUpdated)

    this.profileService.update(this.profileForm).subscribe(data => {
      // this.toastr.success("Profile Updated!");
      alert("OLE LOS CANELONES")
    },
    err => {
      alert("UIS...")  
      console.log("ERORR",err)}  
    );

    
  }
}