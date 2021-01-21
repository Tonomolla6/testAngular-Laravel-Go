import { Component, Input, OnInit } from '@angular/core';
import { Profile, ProfileService, UserService, User } from '../../core';
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
  discotecas!: Discoteca[];
  profileForm: FormGroup;
  profile!: Profile;
  currentUser!: User;

  constructor(
    private profileService: ProfileService,
    private discotecasService: DiscotecasService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService

  ) {
    this.profileForm = this.fb.group({
      'name': [''], //Validators.required
      'surname': [''],
      'description': [''],
      'bio': ['']  //new FormControl()
    });

    // this.profile = {
    //   Name: "",
    //   Surname: "",
    //   Description: "",
    //   Bio: ""
    // }

  }




  ngOnInit(): void {

    this.profileService.get().subscribe(data => {
      this.profile = data.profile;

       //Get default value from user's profile
      this.profileForm.value.name = data.profile.Name
      this.profileForm.value.surname = data.profile.Surname
      this.profileForm.value.bio = data.profile.Bio
      this.profileForm.value.description = data.profile.Description
    });

    this.userService.currentUser.subscribe(
      (userData)=> {
        this.discotecasService.getDiscotecasByUser(parseInt(userData.id)).subscribe(data => {  //Coger la id del current user y pasarla a getDiscotecasByUser(id)
          this.discotecas = data.discotecas;
        })
      }
    )
  }

  submitProfile() {
    this.profileService.update(this.profileForm.value).subscribe(data => {
      // this.toastr.success("Profile Updated!");
      // alert("OLE LOS CANELONES")
    },
      err => {
        if (err.profile) { //Todo ok porque el backend ha devuelto el perfil updated
          alert("PErfil updated")
        } else {
          alert("error en el update")
          console.log("Error de update: ", err)
        }
      }
    );


  }
}