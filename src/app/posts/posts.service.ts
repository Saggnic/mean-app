import {Post} from "./post.model";
import {Title} from "@angular/platform-browser";
import {Subject} from "rxjs";

export class PostService {
    private posts : Post[] = [];
    private postsUpdatedSubject = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];
    }

    addPosts(title : String, content : String) {
        const post: Post = {
            title: title,
            content: content
        };
        this.posts.push(post);
        this.postsUpdatedSubject.next([...this.posts]);
    }

    getPostUpdateSubjectListener() {
        return this.postsUpdatedSubject.asObservable();
    }
}
