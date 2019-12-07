import {Post} from "./post.model";
import {Title} from "@angular/platform-browser";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map} from 'rxjs/operators';

@Injectable({providedIn: "root"})
export class PostService {
    private posts : Post[] = [];
    // private posts : any = [];
    private postsUpdatedSubject = new Subject<Post[]>();
    constructor(private http : HttpClient) {}

    getPosts() {
        this.http.get < {
            message: string;
            posts: any
        } > ("http://localhost:3000/api/posts").pipe(map((postData) => {
            return postData.posts.map(post => {
                return {title: post.title, content: post.content, id: post._id};
            });
        })).subscribe(transformedPosts => {
            this.posts = transformedPosts;
            console.log(this.posts);
            this.postsUpdatedSubject.next([...this.posts]);
        });
    }


    addPosts(title : String, content : String) {
        const post: Post = {
            id: null,
            title: title,
            content: content
        };

        this.http.post < {
            message: String,
            postId: string
        } > ("http://localhost:3000/api/posts", post).subscribe((data) => {
            console.log(data.message);
            const post_id = data.postId;
            post.id = post_id;
            this.posts.push(post);
            this.postsUpdatedSubject.next([...this.posts]);


        });

    }

    getPostUpdateSubjectListener() {
        return this.postsUpdatedSubject.asObservable();
    }

    deletePost(postId : String) {
        this.http.delete("http://localhost:3000/api/posts/" + postId).subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id != postId);
            this.posts = updatedPosts;
            this.postsUpdatedSubject.next([...this.posts]);
        });
    }
}
