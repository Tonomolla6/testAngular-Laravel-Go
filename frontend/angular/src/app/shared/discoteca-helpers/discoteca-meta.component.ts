import { Component, Input } from '@angular/core';

import { Discoteca } from '../../core';

@Component({
  selector: 'app-discoteca-meta',
  templateUrl: './discoteca-meta.component.html'
})
export class DiscotecaMetaComponent {
  @Input() discoteca: Discoteca;
}
