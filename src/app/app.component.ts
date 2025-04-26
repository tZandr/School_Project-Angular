import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsService } from "./posts.service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-http';
  // url = 'https://jsonplaceholder.typicode.com/posts'; 
  apiData: any = [];

  /*async getAPIData(): Promise<[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  } */
  constructor(private postService: PostsService) {
  /*  this.getAPIData().then((data) => {
      console.log(data);
      this.apiData = data;
    }) */
  }

  ngOnInit() {
    this.postService.getPosts().subscribe((data => {
      console.log(data);
      this.apiData = data;
    })); 
  }
}
