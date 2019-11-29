import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  @Input() postsList: Post[] = [
    // {
    //   title: "First Post",
    //   content: "Body of first post"
    // },
    // {
    //   title: "Second Post",
    //   content: "Body of second post"
    // },
    // {
    //   title: "Third Post",
    //   content: "Body of third post"
    // }
  ];

  ngOnInit() {}
}
