import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class LogrosAcademicosService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-academicos`;
    return this.http.get<any>(url, {headers});
  }

  getActive(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-academicos-activos`;
    return this.http.get<any>(url, {headers});
  }

  getById(id): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-academicos/${id}`;
    return this.http.get<any>(url, {headers});
  }

  postData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-academicos`;
    return this.http.post<any>(url, data, {headers});
  }

  putData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-academicos/${data.id}`;
    return this.http.put<any>(url, data, {headers});
  }

  cambiarEstado(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-academicos/cambiarEstado`;
    return this.http.post<any>(url, data, {headers});
  }

  delete(id: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-academicos/${id}`;
    return this.http.delete<any>(url, {headers});
  }

  filtrar(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-academicos/filtrar`;
    return this.http.post<any>(url, data, {headers});
  }

  getFiltros(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/logros-academicos/getFiltros`;
    return this.http.post<any>(url, data, {headers});
  }






}
