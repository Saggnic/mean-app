import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

// Interceptors are functions provided by http of angular itself.
// they are used to manupulate any outgoing http requests like adding headers to it ...
// here we will add the jwt to the http headers through interceptors

// tslint:disable-next-line: max-line-length
@Injectable() // ALWAYS REMEMBER...THE SERVICE WHICH INJECTS SOME OTHER SERVICE ,MUST HAVE THE @INJECTABLE, the host not guest
export class AuthInterceptors implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      // don't directly edit outgoing req...make a clone then manupulate that
      // tslint:disable-next-line: max-line-length
      headers: req.headers.set("Authorization", "Bearer " + authToken) // adding configuration while cloning...adding the extra header ,not overriding ,but adding by SET
    });
    return next.handle(authRequest);
  }
}
