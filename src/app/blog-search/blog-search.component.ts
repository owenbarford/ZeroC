import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: [ './blog-search.component.css' ]
})
export class BlogSearchComponent implements OnInit {
  blogs: Observable<Blog[]>;
  private searchTerms = new Subject<string>();

  constructor(private blogService: BlogService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.blogs = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.blogService.searchBlogs(term)),
    );
  }
}
