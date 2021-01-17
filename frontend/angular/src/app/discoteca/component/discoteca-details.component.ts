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
        // this.populateComments();

      }
    );
  }

  onFavorite() {
    // this.article.favorited = favorited;
    this.toastr.success("Hello, I'm the toastr message.")
    console.log("FAVORITOOOOO", this.discoteca)
    // favorited=true;

    // if (favorited) {
    //   //Favorito
    //   console.log("Vam os a favorite")
    //   this.discotecasService.favorite(id);
    //   // this.article.favoritesCount++;
    // } else {
    //   //Delete favorito
    //   // this.article.favoritesCount--;
    // }
  }
  //Aqui irá el delete, update, comments, favorited...
  //Aqui va el favoritos
}