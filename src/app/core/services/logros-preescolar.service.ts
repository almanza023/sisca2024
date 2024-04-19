import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class LogrosPreescolarService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-preescolar`;
    return this.http.get<any>(url, {headers});
  }

  getActive(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-preescolar-activos`;
    return this.http.get<any>(url, {headers});
  }

  getById(id): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-preescolar/${id}`;
    return this.http.get<any>(url, {headers});
  }

  postData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-preescolar`;
    return this.http.post<any>(url, data, {headers});
  }

  putData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-preescolar/${data.id}`;
    return this.http.put<any>(url, data, {headers});
  }

  cambiarEstado(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-preescolar/cambiarEstado`;
    return this.http.post<any>(url, data, {headers});
  }

  delete(id: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-preescolar/${id}`;
    return this.http.delete<any>(url, {headers});
  }

  filtrar(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-preescolar/filtrar`;
    return this.http.post<any>(url, data, {headers});
  }

  getFiltros(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-preescolar/getFiltros`;
    return this.http.post<any>(url, data, {headers});
  }







}
