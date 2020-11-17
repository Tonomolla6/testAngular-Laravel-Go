import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Discoteca,
  DiscotecasService,
  Comment,
  CommentsService,
  User,
  UserService
} from '../core';

@Component({
  selector: 'app-discoteca-page',
  templateUrl: './discoteca.component.html'
})
export class DiscotecaComponent implements OnInit {
  discoteca: Discoteca;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private discotecasService: DiscotecasService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // Retreive the prefetched discoteca
    this.route.data.subscribe(
      (data: { discoteca: Discoteca }) => {
        this.discoteca = data.discoteca;

        // Load the comments on this discoteca
        // this.populateComments();
      }
    );

    // Load the current user's data
    // this.userService.currentUser.subscribe(
    //   (userData: User) => {
    //     this.currentUser = userData;

    //     this.canModify = (this.currentUser.username === this.discoteca.author.username);
    //   }
    // );
  }

  // onToggleFavorite(favorited: boolean) {
  //   this.discoteca.favorited = favorited;

  //   if (favorited) {
  //     this.discoteca.favoritesCount++;
  //   } else {
  //     this.discoteca.favoritesCount--;
  //   }
  // }

  // onToggleFollowing(following: boolean) {
  //   this.discoteca.author.following = following;
  // }

  deleteDiscoteca() {
    this.isDeleting = true;

    this.discotecasService.destroy(this.discoteca.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

  // populateComments() {
  //   this.commentsService.getAll(this.discoteca.slug)
  //     .subscribe(comments => this.comments = comments);
  // }

  // addComment() {
  //   this.isSubmitting = true;
  //   this.commentFormErrors = {};

  //   const commentBody = this.commentControl.value;
  //   this.commentsService
  //     .add(this.discoteca.slug, commentBody)
  //     .subscribe(
  //       comment => {
  //         this.comments.unshift(comment);
  //         this.commentControl.reset('');
  //         this.isSubmitting = false;
  //       },
  //       errors => {
  //         this.isSubmitting = false;
  //         this.commentFormErrors = errors;
  //       }
  //     );
  // }

  // onDeleteComment(comment) {
  //   this.commentsService.destroy(comment.id, this.discoteca.slug)
  //     .subscribe(
  //       success => {
  //         this.comments = this.comments.filter((item) => item !== comment);
  //       }
  //     );
  // }

}
