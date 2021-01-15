import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AutJwtService } from './aut-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  url = 'http://127.0.0.1:8080';

  constructor(private autenticadorJwt: AutJwtService) { }

  /**Intercepta las peticiones que se van a realizar y las redirige a la url indicada, añadiendole los datos necesarios para
   * la autenticación con el token jwt
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.autenticadorJwt.recuperarJwt();

    if(token){
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });

    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    const newUrl = {url: this.url + request.url};
    request = Object.assign(request, newUrl);
    const newUrlWithParams = {urlWithParams: this.url + request.urlWithParams};
    request = Object.assign(request, newUrlWithParams);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      finalize(() => {
       })
      );


  }
}
