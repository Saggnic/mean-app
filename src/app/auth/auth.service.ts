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
  private userId: string;
  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log(authData);
    this.http.post("http://localhost:3000/api/user/signup", authData).subscribe(
      response => {
        console.log(response);
        this.router.navigate(["/login"]);
      },
      err => {
        //console.log(err);
        this.authStatusListener.next(false);
        //console.log(err);
        //alert("Something went wrong");
        this.router.navigate(["/signUp"]);
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    // console.log(authData);
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        "http://localhost:3000/api/user/login",
        authData
      )
      .subscribe(
        response => {
          console.log(response);
          this.token = response.token;
          if (this.token) {
            const expiresinDuration = response.expiresIn;
            this.setAuthTimer(expiresinDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresinDuration * 1000
            );
            this.saveAuthData(this.token, expirationDate, this.userId);
            this.router.navigate(["/posts"]);
          }
        },
        err => {
          //alert("Invalid Credential");
          this.authStatusListener.next(false); //so the spinner will stop spinning
        }
      );
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
      this.userId = authInformation.userId;
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
    this.userId = null;
    this.router.navigate(["/login"]);
  }

  getToken() {
    return this.token;
  }
  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    console.log("While saving in local Storage: " + userId);
    localStorage.setItem("userId", userId);
  }
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  getAuthDatafromLocalStorage() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }
}
