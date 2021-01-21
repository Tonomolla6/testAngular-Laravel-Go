import { Component, Input, OnInit } from '@angular/core';
import { Profile, ProfileService, UserService, User, CompanyService,Company } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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
  companies!: Company[];

  constructor(
    private profileService: ProfileService,
    private discotecasService: DiscotecasService,
    private companyService: CompanyService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService

  ) {
    this.profileForm = this.fb.group({
      'name': [''], //Validators.required
      'surname': [''],
      'description': [''],
      'bio': ['']  //new FormControl()
    });


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

    this.companyService.getCompanies().subscribe(
      (companies)=> {
        this.companies = companies;
        console.log(this.companies);
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
          this.toastr.success("Perfil updated");
        } else {
          this.toastr.error("Perfil update error");
          console.log("Error de update: ", err)
        }
      }
    );
  }
}