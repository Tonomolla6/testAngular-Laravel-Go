import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiscotecaComponent } from './discoteca.component';
import { DiscotecaCommentComponent } from './discoteca-comment.component';
import { DiscotecaResolver } from './discoteca-resolver.service';
import { MarkdownPipe } from './markdown.pipe';
import { SharedModule } from '../shared';
import { DiscotecaRoutingModule } from './discoteca-routing.module';

@NgModule({
  imports: [
    SharedModule,
    DiscotecaRoutingModule
  ],
  declarations: [
    DiscotecaComponent,
    DiscotecaCommentComponent,
    MarkdownPipe
  ],

  providers: [
    DiscotecaResolver
  ]
})
export class DiscotecaModule {}
