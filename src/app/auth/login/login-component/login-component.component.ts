import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login-component",
  templateUrl: "./login-component.component.html",
  styleUrls: ["./login-component.component.css"]
})
export class LoginComponentComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  onLogin(form: NgForm) {
    console.log("ligin Form submitted");
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
