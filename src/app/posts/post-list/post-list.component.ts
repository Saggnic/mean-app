import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
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

  private postSubscription: Subscription;
  constructor(public postService: PostService) {}
  ngOnInit() {
    this.postsList = this.postService.getPosts();
    this.postSubscription = this.postService
      .getPostUpdateSubjectListener()
      .subscribe((posts: Post[]) => {
        this.postsList = posts;
      });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
