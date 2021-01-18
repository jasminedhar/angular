import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddBlog } from '../models/addblog.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  getAllPost() {
    return this.http.get('https://localhost:44366/api/BlogModels', {})
  }
  deleteblogs(id:number) {
    return this.http.delete('https://localhost:44366/api/BlogModels/'+id, {})
  }
  editblogs(id: number): Observable<AddBlog> {
    return this.http.get<AddBlog>('https://localhost:44366/api/BlogModels/' + id, {})
  }
  updateblogs(id: number, addblog: AddBlog) {
    return this.http.post('https://localhost:44366/api/BlogModels', {
      id: addblog.Id,
      title: addblog.Title,
      description: addblog.Description
    })
  }
  }

