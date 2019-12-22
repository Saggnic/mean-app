import { Component, OnInit } from "@angular/core";
import { Post } from "./posts/post.model";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = "mean-app";
  posts: Post[] = [];

  ngOnInit() {
    this.authService.autoAuthUser();
  }
  onStorePost(post) {
    this.posts.push(post);
  }
  getUrl() {
    return "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh5S-CeXE2xcC2V5l0nBTHzYmRKsBhZ0t5ZtsV3uE_QRvKRqmAxg&s')";
  }
}
