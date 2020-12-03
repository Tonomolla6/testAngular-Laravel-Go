import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import{
  Discoteca,
  DiscotecasService
} from '../core'


@Component({
  selector: 'app-discoteca',
  templateUrl: './discoteca.component.html',
  styleUrls: ['./discoteca.component.css']
})
export class DiscotecaComponent implements OnInit {
  

  constructor(
    private route: ActivatedRoute,
    private discotecasService: DiscotecasService,
    private router: Router,

  ) { }
  // discoteca: Discoteca;

  ngOnInit(): void {
    // this.route.data.subscribe(
    //   (data: { discoteca: Discoteca }) => {
    //     this.discoteca = data.discoteca;

    //     // Load the comments on this song
    //   }
    // );

  }

}
