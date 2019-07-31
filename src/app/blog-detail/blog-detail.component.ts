import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: [ './blog-detail.component.css' ]
})
export class BlogDetailComponent implements OnInit {
    blog: Blog;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(id)
      .subscribe(blog => this.blog = blog);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.blogService.updateBlog(this.blog)
      .subscribe(() => this.goBack());
  }
}
