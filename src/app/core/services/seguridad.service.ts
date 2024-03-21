import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private http: HttpClient) { }

  postLogin(data: any): Observable<any> {
    let url=`${environment.baseURL}/login`;
    return this.http.post<any>(url, data);
  }

}
