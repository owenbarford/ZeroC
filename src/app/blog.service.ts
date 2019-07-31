import { Injectable, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Blog } from './blog';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BlogService {

  private blogsUrl = 'api/blogs';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
      this.blogsUrl = `${origin}${this.blogsUrl}`;
    }

  /** GET blogs from the server */
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl)
      .pipe(
        tap(blogs => this.log('fetched blogs')),
        catchError(this.handleError('getBlogs', []))
      );
  }

  /** GET blog by id. Return `undefined` when id not found */
  getBlogNo404<Data>(id: number): Observable<Blog> {
    const url = `${this.blogsUrl}/?id=${id}`;
    return this.http.get<Blog[]>(url)
      .pipe(
        map(blogs => blogs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} blog id=${id}`);
        }),
        catchError(this.handleError<Blog>(`getBlog id=${id}`))
      );
  }

  /** GET blog by id. Will 404 if id not found */
  getBlog(id: number): Observable<Blog> {
    const url = `${this.blogsUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      tap(_ => this.log(`fetched blog id=${id}`)),
      catchError(this.handleError<Blog>(`getBlog id=${id}`))
    );
  }

  /* GET blogs whose name contains search term */
  searchBlogs(term: string): Observable<Blog[]> {
    if (!term.trim()) {
      // if not search term, return empty blog array.
      return of([]);
    }
    return this.http.get<Blog[]>(`${this.blogsUrl}/?blogName=${term}`).pipe(
      tap(_ => this.log(`found blogs matching "${term}"`)),
      catchError(this.handleError<Blog[]>('searchBlogs', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new blog to the server */
  addBlog(blogName: string): Observable<Blog> {
    const blog = { blogName };

    return this.http.post<Blog>(this.blogsUrl, blog, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((blog: Blog) => this.log(`added blog w/ id=${blog.id}`)),
      catchError(this.handleError<Blog>('addBlog'))
    );
  }

  /** DELETE: delete the blog from the server */
  deleteBlog(blog: Blog | number): Observable<Blog> {
    const id = typeof blog === 'number' ? blog : blog.id;
    const url = `${this.blogsUrl}/${id}`;

    return this.http.delete<Blog>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted blog id=${id}`)),
      catchError(this.handleError<Blog>('deleteBlog'))
    );
  }

  /** PUT: update the blog on the server */
  updateBlog(blog: Blog): Observable<any> {
    return this.http.put(this.blogsUrl, blog, httpOptions).pipe(
      tap(_ => this.log(`updated blog id=${blog.id}`)),
      catchError(this.handleError<any>('updateBlog'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BlogService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`Blog Service: ${message}`);
  }
}
