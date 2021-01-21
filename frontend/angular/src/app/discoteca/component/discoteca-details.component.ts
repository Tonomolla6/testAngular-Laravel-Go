import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  events!: [];

  constructor(
    private route: ActivatedRoute,
    private discotecasService: DiscotecasService,
    private router: Router,
    private toastr: ToastrService


  ) { }

  ngOnInit(): void {
    //Details
    this.route.data.subscribe((data) => {
      this.discoteca = data.discoteca;
      this.events = data.discoteca.Events
      
      console.log("DISCOTECA: ", data.discoteca.Events)
    });
  }

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
}