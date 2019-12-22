import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthData } from "./auth.data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log(authData);
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log(authData);
    this.http
      .post<{ token: string; expiresIn: number }>(
        "http://localhost:3000/api/user/login",
        authData
      )
      .subscribe(response => {
        console.log(response);
        this.token = response.token;
        if (this.token) {
          const expiresinDuration = response.expiresIn;
          this.setAuthTimer(expiresinDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresinDuration * 1000
          );
          this.saveAuthData(this.token, expirationDate);
          this.router.navigate(["/posts"]);
        }
      });
  }

  //if local storage has the info of login, then re-authorize that user
  autoAuthUser() {
    const authInformation = this.getAuthDatafromLocalStorage();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const isInFuture = authInformation.expirationDate > now; //if the expiration date is in future then the token is valid
    if (isInFuture) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(
        (authInformation.expirationDate.getTime() - now.getTime()) / 1000 //dividing  by 1000 for second-millisecond conversion
      );
      this.authStatusListener.next(true);
    }
  }

  logOut() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  getAuthDatafromLocalStorage() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }
}
