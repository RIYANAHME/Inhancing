import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './post.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {


  constructor(public postService: PostsService) {

  }

  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading= false;

  ngOnInit(): void {
    this.isLoading= true;
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateList()
    .subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

}
