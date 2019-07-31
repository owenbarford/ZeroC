import { Component, OnInit } from '@angular/core';

import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs()
    .subscribe(blogs => this.blogs = blogs);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.blogService.addBlog(name)
      .subscribe(blog => {
        this.blogs.push(blog);
      });
  }

  delete(blog: Blog): void {
    this.blogService.deleteBlog(blog)
        .subscribe(() => {
          this.blogs = this.blogs.filter(h => h !== blog);
        });
  }

}
