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

  constructor(
    private route:ActivatedRoute,
    private discotecasService:DiscotecasService,
    private router:Router,
    private toastr: ToastrService


  ) {}
  
  ngOnInit(): void { 
    
      //Details
      this.route.data.subscribe((data) => {
          this.discoteca = data.discoteca;
          // this.populateComments();

        }
      );

      // Get favorites
      this.route.data.subscribe((data) => {
        this.discoteca = data.discoteca;
        console.log("HOLAAAa");
        console.log(data)
        // this.populateComments();

      }
    );
  }

  onFavorite() {
    // this.article.favorited = favorited;
    // this.toastr.success("Hello, I'm the toastr message.")


    if(this.discoteca.Liked){//Quitar el favorito
      console.log("tiene faovrito, hay que quitarselo");
      this.discotecasService.unfavorite(this.discoteca.Id)
      .subscribe(
        data => {
          this.toastr.success("UnLike!");
          // this.router.navigateByUrl('/profile/discotecas');
        },
        err =>this.toastr.error("Debes iniciar sesion") //this.toastr.error(err.errors.login) 
      );
    }else{//Dar favorito
      console.log("No tiene favorito, hay que darselo")
      this.discotecasService.favorite(this.discoteca.Id)
      .subscribe(
        data => {
          this.toastr.success("Like!");
          // this.router.navigateByUrl('/profile/discotecas');
        },
        err =>this.toastr.error("Debes iniciar sesion") //this.toastr.error(err.errors.login) 
      );
    }


  }
  // onUnFavorite() {
  //   // this.article.favorited = favorited;
  //   // this.toastr.success("Hello, I'm the toastr message.")


  //   if(this.discoteca.Liked){//Quitar el favorito
  //     console.log("tiene faovrito, hay que quitarselo");
  //     //No funciona bien quitar favorito
  //   }else{//Dar favorito
  //     console.log("No tiene favorito, hay que darselo")
  //     this.discotecasService.favorite(this.discoteca.Id)
  //     .subscribe(
  //       data => {
  //         this.toastr.success("Like!");
  //         // this.router.navigateByUrl('/profile/discotecas');
  //       },
  //       err =>this.toastr.error("Debes iniciar sesion") //this.toastr.error(err.errors.login) 
  //     );
  //   }


  // }
  //Aqui irá el delete, update, comments, favorited...
  //Aqui va el favoritos
}