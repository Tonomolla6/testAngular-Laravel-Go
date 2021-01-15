import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Declaramos el route para obtez url.
  constructor(
    private userService: UserService,
  ) {}
  currentUser!: User;

  ngOnInit() {
    console.log("ng home init");
    // this.test = "test";

    this.userService.currentUser.subscribe(
      (userData)=> {
        this.currentUser = userData;
        console.log(this.currentUser);
      }
    )
  }
}