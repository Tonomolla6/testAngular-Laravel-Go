import { Component, Input, OnInit } from '@angular/core';

// import { CommonModule } from "@angular/common";




import { Discoteca } from '../../core';

@Component({
  selector: 'app-discoteca-preview',
  templateUrl: './discoteca-preview.component.html'
})
export class DiscotecaPreviewComponent implements OnInit{
  @Input() discoteca!: Discoteca;


  ngOnInit(){


  }
  
  // onToggleFavorite(favorited: boolean) {
  //   this.discoteca['favorited'] = favorited;

  //   if (favorited) {
  //     this.discoteca['favoritesCount']++;
  //   } else {
  //     this.discoteca['favoritesCount']--;
  //   }
  // }
}