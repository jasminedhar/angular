import { Component, OnInit } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public blogs: any;
  constructor(private blogService: BlogService,
    private router: Router) {
  }

  ngOnInit() {
    this.getAllPost();
  }
  getAllPost() {
    this.blogService.getAllPost().subscribe(result => {
      this.blogs = result;
      console.log(result);
    });
  }
  deleteblog(id: number) {
    this.blogService.deleteblogs(id).subscribe(result => {
      this.getAllPost();
    });
  }
  editblog(id: number) {
    this.router.navigate(['/addblog', { id: id }], { skipLocationChange: true });
   
  }
}
