import { Component, Input, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { CommonModule } from "@angular/common";




import { Discoteca } from '../../core';

@Component({
  selector: 'app-discoteca-preview',
  templateUrl: './discoteca-preview.component.html'
})
export class DiscotecaPreviewComponent implements OnInit{
  @Input() discoteca!: Discoteca;

  // constructor(private toastr: ToastrService) {}

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }
  ngOnInit(){
    console.log("Discoteca page on init")
    // this.showSuccess()

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