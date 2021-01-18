import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AddBlogService } from '../service/add-blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AddBlog } from '../models/addblog.model';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {
  public addBlog: AddBlog;
  id: any;
  constructor(private addblogService: AddBlogService, private router: Router, private activatedRoute: ActivatedRoute, private blogService: BlogService) {
    //this.activatedRoute.queryParams.subscribe(params => {
    //  let id = params['id'];
    //  alert(id); // Print the parameter to the console. 
    //});
    this.addBlog = new AddBlog();
    if (this.activatedRoute.snapshot && this.activatedRoute.snapshot.paramMap) {
      let id = this.activatedRoute.snapshot.paramMap.get('id').trim();
      alert(id);
      this.editBlog(id);
    }
    
  }

  ngOnInit() {
  }
  addPost() {
    if (this.addBlog.Title && this.addBlog.Description) {
      this.addblogService.addPost(this.addBlog).subscribe(res => {
        console.log('response is ', res);
      });
    } else {
      alert('Title and Description required');
    }
  }
  editBlog(id: any) {
    this.blogService.editblogs(id).subscribe(result => {
      this.addBlog.Title = result.Title;
      this.addBlog.Description = result.Description;
      this.addBlog.Id = result.Id;
     // this.addBlog.description=result
    });
  }
}
