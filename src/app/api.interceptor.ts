import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user/user.service';

const { appUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private router: Router, private userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.startsWith('/login') ||
      req.url.startsWith('/users')
    ) {
      req = req.clone({
        withCredentials: true,
        setHeaders: {
          'X-Parse-Session-Token': this.userService.getSessionToken(),
        },
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        // } else {
        //   this.errorServie.setError(err);
        //   this.router.navigate(['/error']);
        // }

        return [err];
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  multi: true,
  useClass: AppInterceptor,
  provide: HTTP_INTERCEPTORS,
};
