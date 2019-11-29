import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  enteredContent = "";
  enteredTitle = "";
  @Output() postCreatedEvent = new EventEmitter<Post>();

  onSavePost(form: NgForm) {
    const storedPost: Post = {
      title: form.value.enteredTitle,
      content: form.value.enteredContent
    };
    this.postCreatedEvent.emit(storedPost);
  }
}
