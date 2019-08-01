import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  pageContent = {
    header : {
      title : 'About ZeroC New Homes',
      strapline : ''
    },
    // tslint:disable-next-line:max-line-length
    content : 'ZeroC New Homes is a website that documents the process of purchasing a new build home from a property developer.'
  };

  constructor() { }

  ngOnInit() {
  }

}
