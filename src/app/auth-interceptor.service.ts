import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterCeptorService implements HttpInterceptor  {
  intercept(req: HttpRequest<any>, next: HttpHandler ) {
    const modifiedReq = req.clone({
      headers: req.headers.append('auth-key', 'xyz')
    });
    return next.handle(modifiedReq);
  }
}
