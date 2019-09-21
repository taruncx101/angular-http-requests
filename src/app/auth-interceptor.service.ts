import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterCeptorService implements HttpInterceptor  {
  intercept(req: HttpRequest<any>, next: HttpHandler ) {
    console.log('req is on the way');
    return next.handle(req);
  }
}
