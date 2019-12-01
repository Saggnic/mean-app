import {Post} from "./post.model";
import {Title} from "@angular/platform-browser";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class PostService {
    private posts : Post[] = [];
    private postsUpdatedSubject = new Subject<Post[]>();
    constructor(private http : HttpClient) {}

    getPosts() { // return [...this.posts];
        console.log("trying to fetch");
        this.http.get < {
            message: String;
            posts: Post[];
        } > ("http://localhost:3000/api/posts").subscribe(postData => {
            this.posts = postData.posts;
            this.postsUpdatedSubject.next([...this.posts]);
            console.log("fetched successfully");
        });
    }

    addPosts(title : String, content : String) {
        const post: Post = {
            id: null,
            title: title,
            content: content
        };

        this.http.post < {
            message: String
        } > ("http://localhost:3000/api/posts", post).subscribe((data) => {
            console.log(data.message);
            this.posts.push(post);
            this.postsUpdatedSubject.next([...this.posts]);

        });

    }

    getPostUpdateSubjectListener() {
        return this.postsUpdatedSubject.asObservable();
    }
}
