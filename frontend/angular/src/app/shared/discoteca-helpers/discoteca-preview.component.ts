import { Component, Input } from '@angular/core';
import { Discoteca } from '../../core';
@Component({
    selector: 'app-discoteca-preview',
    templateUrl: './discoteca-preview.component.html'
  })
  export class DiscotecaPreviewComponent {
    @Input() discoteca: Discoteca; 
     
  }