import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  isLoading = false;
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onSignUp(form: NgForm) {
    console.log("submitted form :" + form);
    if (form.invalid) {
      return;
    }
    console.log("here");
    this.authService.createUser(form.value.email, form.value.password);
  }
}
