import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  error = new Subject<string>();
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
    }, error => {
      this.error.next(error.message);
    });
  }
  fetctPosts() {
    return this.http.get<{ [key: string]: Post }>(
      'https://ng-http-api.firebaseio.com//posts.json',
      {
        headers: new HttpHeaders({
          'custom-headers': 'hello'
        })
      }
    )
    .pipe(map(responseData => {
      const postArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postArray.push({...responseData[key], id: key});
        }
      }
      return postArray;
    }),
    catchError(errorRes => {
      // send to analytics server
      // for generic error handing task
      return throwError(errorRes);
    }));
  }
  deletePosts() {
    return this.http.delete('https://ng-http-api.firebaseio.com//posts.json');
  }
}
