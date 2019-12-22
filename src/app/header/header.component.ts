import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authlistenerSubs: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authlistenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        console.log("User is authenticated :" + isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.authlistenerSubs.unsubscribe();
  }
}
