import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { LoginComponentComponent } from "./auth/login/login-component/login-component.component";
import { SignupComponent } from "./auth/signup/signup.component";

const routes: Routes = [
  {
    path: "",
    component: PostListComponent
  },
  {
    path: "create",
    component: PostCreateComponent
  },
  {
    path: "edit/:postId",
    component: PostCreateComponent
  },
  {
    path: "login",
    component: LoginComponentComponent
  },
  {
    path: "signUp",
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
