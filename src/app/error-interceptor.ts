import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = "Reason Unknown";
        if (error.error.message || error.message) {
          message = error.error.message ? error.error.message : error.message;
          this.dialog.open(ErrorComponent, {
            data: {
              message: message
            }
          });
        }
        console.log("Some Error Has Occurred");
        return throwError(error);
      })
    );
  }
}
