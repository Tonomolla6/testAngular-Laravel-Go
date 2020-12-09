import { Component, Input } from '@angular/core';
// import { CommonModule } from "@angular/common";

import { Discoteca } from '../../core';
console.log("Discoteca preview component");
@Component({
  selector: 'app-discoteca-preview',
  templateUrl: './discoteca-preview.component.html'
})
export class DiscotecaPreviewComponent {
  @Input() discoteca!: Discoteca;
  

  // onToggleFavorite(favorited: boolean) {
  //   this.discoteca['favorited'] = favorited;

  //   if (favorited) {
  //     this.discoteca['favoritesCount']++;
  //   } else {
  //     this.discoteca['favoritesCount']--;
  //   }
  // }
}
