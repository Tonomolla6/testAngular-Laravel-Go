import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, DiscotecaListConfig, TagsService, UserService } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  listDiscoConfig: DiscotecaListConfig = {
    type: 'all',
    filters: {}
  };

  // listConfigAll: ListConfig = {
  //   type: 'all',
  //   filters: {}
  // };


  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );

    this.tagsService.getAll()
    .subscribe(tags => {
      this.tags = tags;
      this.tagsLoaded = true;
    });
  }

  setListTo(type: string = '', filters: Object = {}) {
    console.log("SET LIST TO");
    console.log(type);
    this.tagsLoaded = false;
    console.log(this.tagsLoaded);
    // console.log();
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    if(type=='discotecas'){
      console.log("Mostrar discotecas");
    }

    if(type=='eventos'){
      console.log("Mostrar Eventos");
      // this.listDiscoConfig = {type: type, filters: filters};
      // return;
    }

    // Otherwise, set the list object
    this.listDiscoConfig = {type: type, filters: filters};
  }
}