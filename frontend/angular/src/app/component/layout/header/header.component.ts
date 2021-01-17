import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Declaramos el route para obtez url.
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router

  ) {}
  currentUser!: User;
  show!: Boolean
  

  ngOnInit() {
    this.show = false;
    console.log("ng home init");
    // this.test = "test";

    this.userService.currentUser.subscribe(
      (userData)=> {
        this.currentUser = userData;
        console.log(this.currentUser);
      }
    )
  }

  changeShow() {
    this.show = this.show ? false : true;
  }

  logOut() {
    this.show = false;
    this.userService.purgeAuth();
    this.toastr.success("Sessión cerrada correctamente");
    this.router.navigateByUrl('/');
  }
}