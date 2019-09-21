import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterCeptorService implements HttpInterceptor  {
  intercept(req: HttpRequest<any>, next: HttpHandler ) {
    console.log('req is on the way');
    const modifiedReq = req.clone({
      headers: req.headers.append('auth-key', 'xyz')
    });
    return next.handle(modifiedReq)
    .pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Response arrived. Body data: ');
          console.log(event.body);
        }
      })
    );
  }
}
