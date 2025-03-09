import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        const clonedReq = token
            ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
            : req;

        return next.handle(clonedReq).pipe(
            retry(3),
            catchError((error: HttpErrorResponse) => {
                const errorMessage = error.error instanceof ErrorEvent
                    ? `שגיאה: ${error.error.message}`
                    : `שגיאה ${error.status}: ${error.message}`;

                console.error(`שגיאה: ${errorMessage}`);
                return throwError(() => error);
            })
        );
    }
}
