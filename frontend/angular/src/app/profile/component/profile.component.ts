import { Component, OnInit } from '@angular/core';
import { Profile, ProfileService } from '../../core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
  ) { }
  profileForm!: FormGroup

  ngOnInit(): void {
    this.profileService.get().subscribe(data => { 
      this.profileForm = data;
      console.log(data)
    });
  }

  submitProfile() {
    
  }
}