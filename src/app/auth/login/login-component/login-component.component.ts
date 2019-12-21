import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-login-component",
  templateUrl: "./login-component.component.html",
  styleUrls: ["./login-component.component.css"]
})
export class LoginComponentComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    console.log("ligin Form submitted");
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
