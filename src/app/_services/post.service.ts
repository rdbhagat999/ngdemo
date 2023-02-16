import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPost } from '@app/_models/post';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);

  constructor() {}

  getPosts(): Observable<IPost[]> {
    return this.http
      .get(`https://dummyjson.com/auth/posts?limit=30`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        //   'Content-Type': 'application/json',
        // },
      })
      .pipe(map((data: any) => data?.posts as IPost[]));
  }

  getPostById(postId: number): Observable<IPost> {
    return this.http.get<IPost>(`https://dummyjson.com/auth/posts/${postId}`, {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   'Content-Type': 'application/json',
      // },
    });
  }

  getAllPostsByUserId(userId: number): Observable<IPost[]> {
    return this.http
      .get(`https://dummyjson.com/auth/posts/user/${userId}`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        //   'Content-Type': 'application/json',
        // },
      })
      .pipe(map((data: any) => data?.posts as IPost[]));
  }
}
