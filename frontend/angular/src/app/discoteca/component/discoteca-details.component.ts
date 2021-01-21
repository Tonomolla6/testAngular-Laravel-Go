import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../core';
import { Observable } from 'rxjs';
import { DiscotecaPreviewComponent } from './discoteca-preview.component';
import { ToastrService } from 'ngx-toastr';

import {
  Discoteca,
  DiscotecasService
} from '../../core';

@Component({
  selector: 'app-discoteca-details',
  templateUrl: './discoteca-details.component.html',
  styleUrls: ['./discoteca.component.css']
})
export class DiscotecaDetailsComponent implements OnInit {
  @Input()
  discoteca!: Discoteca;
  currentUser!: User;
  events!: [];
  author!: boolean;

  constructor(
    private route: ActivatedRoute,
    private discotecasService: DiscotecasService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService


  ) { }

  ngOnInit(): void {
    //Details
    this.route.data.subscribe((data) => {
      this.discoteca = data.discoteca;
      this.events = data.discoteca.Events


      this.userService.currentUser.subscribe(
        (userData) => {
          this.currentUser = userData;
        }
      )

      data.discoteca.User == this.currentUser.id ? this.author = true : this.author = false;

    });


  }

  //LIKE
  onFavorite() {
    if (this.discoteca.Liked) {//Quitar el favorito
      this.discotecasService.unfavorite(this.discoteca.Id)
        .subscribe(
          data => {
            this.toastr.success("UnLike!");
            this.discoteca.Liked = false;
            this.discoteca.Likes--;
          },
          err => this.toastr.error("Debes iniciar sesion") //this.toastr.error(err.errors.login) 
        );
    } else { //Dar favorito
      this.discotecasService.favorite(this.discoteca.Id)
        .subscribe(
          data => {
            this.toastr.success("Like!");
            this.discoteca.Liked = true;
            this.discoteca.Likes++;
          },
          err => this.toastr.error("Debes iniciar sesion") //this.toastr.error(err.errors.login) 
        );
    }

  }

  //DELETE
  deleteDisco() {
    // console.log("Delete disco")
    // console.log(this.discoteca)
    this.discotecasService.deleteDisco(this.discoteca.Id).subscribe(data => {
      this.toastr.success("Disco deleted!")
      this.router.navigateByUrl('/discotecas');
    },
      err => this.toastr.error("Error en el delete")
    )
  }


}