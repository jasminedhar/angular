import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddBlog } from '../models/addblog.model';

@Injectable({
  providedIn: 'root'
})
export class AddBlogService {

  constructor(private http: HttpClient) { }

  addPost(addblog: AddBlog) {
    return this.http.post('https://localhost:44366/api/BlogModels', {
      id: addblog.Id,
      title: addblog.Title,
      description: addblog.Description
    })
  }
}
