import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url = 'https://corsproxy.io/?url=https://umw-progress-api.onrender.com/'; 

  constructor(private http: HttpClient) { }

  getPosts(): Observable<[]> {
    return this.http.get<[]>(`${this.url}`)
  }
}
