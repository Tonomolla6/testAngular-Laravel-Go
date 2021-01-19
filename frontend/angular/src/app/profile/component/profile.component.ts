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

  constructor(
    private profileService: ProfileService,
    private discotecasService:DiscotecasService,
    private router:Router
  ) { }
  profileForm!: FormGroup

  ngOnInit(): void {
    this.profileService.get().subscribe(data => { 
      this.profileForm = data;
      console.log(data)
    });

    //Aqui se le pasa el id del usuario al que le vamos a hacer la consulta
    // this.discotecasService.getDiscotecasByUser().subscribe(data => { 
    //   this.results = data.discotecas;
    // });
  }

  submitProfile() {
    
  }
}