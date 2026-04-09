import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

/** URLs que NO deben mostrar el loader (reloj/IP son silenciosas) */
const SKIP_URLS = [
    'ipinfo.io',
    'ipwho.is',
    'ip-api.com'
];

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const skip = SKIP_URLS.some(url => request.url.includes(url));
        if (skip) {
            return next.handle(request);
        }

        this.loadingService.show();
        return next.handle(request).pipe(
            finalize(() => this.loadingService.hide())
        );
    }
}
