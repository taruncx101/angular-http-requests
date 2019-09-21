import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}
  createAndStorePost(postData: Post) {
    this.http
    .post<{ name: string }>(
      // 'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
      'https://ng-http-api.firebaseio.com//posts.json',
      postData
    )
    .subscribe(responseData => {
      console.log(responseData);
    });
  }
  fetctPosts() {
    return this.http.get<{ [key: string]: Post }>(
      'https://ng-http-api.firebaseio.com//posts.json'
    )
    .pipe(map(responseData => {
      const postArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postArray.push({...responseData[key], id: key});
        }
      }
      return postArray;
    }));
  }
  deletePosts() {
    return this.http.delete('https://ng-http-api.firebaseio.com//posts.json');
  }
}
