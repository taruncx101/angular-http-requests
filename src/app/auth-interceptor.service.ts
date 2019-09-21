import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterCeptorService implements HttpInterceptor  {
  intercept(req: HttpRequest<any>, next: HttpHandler ) {
    console.log('req is on the way');
    const modifiedReq = req.clone({
      headers: req.headers.append('auth-key', 'xyz')
    });
    return next.handle(modifiedReq);
  }
}
