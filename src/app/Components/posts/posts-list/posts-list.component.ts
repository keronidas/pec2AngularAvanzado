import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostDTO } from 'src/app/Models/post.dto';
import { PostService } from 'src/app/Services/post.service';
import { SharedService } from 'src/app/Services/shared.service';
import { AuthState } from 'src/app/auth/models/authState.interface';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts!: PostDTO[];
  userId: any;
  constructor(
    private postService: PostService,
    private router: Router,
    private sharedService: SharedService,
    private store:Store<AuthState>
  ) {
    this.loadPosts();
  }

  private async loadPosts(): Promise<void> {
    let errorResponse: any;
    this.store.select('credentials').subscribe((data) =>this.userId = data);   
    if (this.userId) {
      try {
        this.postService.getPostsByUserId(this.userId).subscribe((data) => {
          this.posts = data
          });
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  async deletePost(postId: string): Promise<void> {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      try {
        let rowsAffected = 0
        this.postService.deletePost(postId).subscribe((data) => {
          rowsAffected = data.affected;
          });
        if (rowsAffected > 0) {
          this.loadPosts();
        }
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }
}
