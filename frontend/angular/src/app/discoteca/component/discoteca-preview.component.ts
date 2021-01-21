import { Component, Input, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { CommonModule } from "@angular/common";




import { Discoteca } from '../../core';

@Component({
  selector: 'app-discoteca-preview',
  templateUrl: './discoteca-preview.component.html',
  styleUrls: ['./discoteca-preview.component.css']
})
export class DiscotecaPreviewComponent implements OnInit{
  @Input() discoteca!: Discoteca;

  // constructor(private toastr: ToastrService) {}

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }
  ngOnInit(){
    // this.showSuccess()

  }
  
}