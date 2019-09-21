import { PostService } from './posts.service';
import { Post } from './post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TouchSequence } from 'selenium-webdriver';
import { Subscriber, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe( errMsg => {
      this.error = errMsg;
    });
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts()
    .subscribe(() => {
      this.loadedPosts = [];
    });
  }
  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetctPosts()
    .subscribe(posts => {
      console.log(posts);
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      console.log(error);
      this.isFetching = false;
      this.error = error.message;
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
