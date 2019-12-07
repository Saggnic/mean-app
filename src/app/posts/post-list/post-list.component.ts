import {Component, OnInit, Input, OnDestroy} from "@angular/core";
import {Post} from "../post.model";
import {PostService} from "../posts.service";
import {Subscription} from "rxjs";

@Component({selector: "app-post-list", templateUrl: "./post-list.component.html", styleUrls: ["./post-list.component.css"]})
export class PostListComponent implements OnInit,
OnDestroy {
    // @Input()postsList : Post[] = [
    // {
    // title: "First Post",
    // content: "Body of first post"
    // },
    // {
    // title: "Second Post",
    // content: "Body of second post"
    // },
    // {
    // title: "Third Post",
    // content: "Body of third post"
    // }
    // ];
    postsList : Post[] = [];
    private postSubscription : Subscription;
    constructor(public postService : PostService) {}
    ngOnInit() {
        console.log("in init");
        this.postService.getPosts();
        this.postSubscription = this.postService.getPostUpdateSubjectListener().subscribe((posts : Post[]) => {
            this.postsList = posts;
            console.log("After fetching post");
            console.log(this.postsList);
        });
    }

    onDelete(postId : string) {
        this.postService.deletePost(postId);
    }
    ngOnDestroy(): void {
        this.postSubscription.unsubscribe();
    }
}
