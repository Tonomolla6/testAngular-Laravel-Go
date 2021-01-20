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
  profileForm: FormGroup;
  profile!: Object;

  constructor(
    private profileService: ProfileService,
    private discotecasService:DiscotecasService,
    private router:Router,
    private fb: FormBuilder,

  ) {
    this.profileForm = this.fb.group({
      'name': [''], //Validators.required
      'surname': [''],
      'description': [''],
      'bio': ['']  //new FormControl()
    }); 

    this.profile ={
      Name:"",
      Surname:"",
      Description:"",
      Bio:""
    }

   }


  

  ngOnInit(): void {
  
    this.profileService.get().subscribe(data => { 
      this.profile=data.profile
    });

    //Aqui se le pasa el id del usuario al que le vamos a hacer la consulta
    // this.discotecasService.getDiscotecasByUser().subscribe(data => { 
    //   this.results = data.discotecas;
    // });
  }

  submitProfile() {

    //Los errores son mentiras, si que existen esas propiedades
    if(this.profileForm.value.name == ""){this.profileForm.value.name=this.profile.Name;}
    if(this.profileForm.value.surname == ""){this.profileForm.value.surname=this.profile.Surname;}
    if(this.profileForm.value.bio == ""){this.profileForm.value.bio=this.profile.Bio;}
    if(this.profileForm.value.description == ""){this.profileForm.value.description=this.profile.Description;}

    this.profileService.update(this.profileForm.value).subscribe(data => {
      // this.toastr.success("Profile Updated!");
      // alert("OLE LOS CANELONES")
    },
    err => {
      if(err.profile){ //Todo ok porque el backend ha devuelto el perfil updated
        alert("PErfil updated")
      }else{
        alert("error en el update")
        console.log("Error de update: ", err)
      }
    }    
    );

    
  }
}