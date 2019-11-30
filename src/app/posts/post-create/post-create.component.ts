import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  enteredContent = "";
  enteredTitle = "";
  @Output() postCreatedEvent = new EventEmitter<Post>();

  constructor(public postService: PostService) {}

  onSavePost(form: NgForm) {
    const storedPost: Post = {
      title: form.value.enteredTitle,
      content: form.value.enteredContent
    };
    //this.postCreatedEvent.emit(storedPost);  // when using service to pass around data , instead of event binding
    this.postService.addPosts(storedPost.title, storedPost.content);
  }
}
