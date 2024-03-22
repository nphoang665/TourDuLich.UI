import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoadingSanphamService } from './loading-sanpham.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public loaderSerivces: LoadingSanphamService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderSerivces.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(
        () => {
          this.loaderSerivces.isLoading.next(false);
        })
    );
  }
}
