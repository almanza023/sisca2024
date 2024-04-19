import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class DireccionGradoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/direccion-grados`;
    return this.http.get<any>(url, {headers});
  }

  getActive(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/direccion-grados-activos`;
    return this.http.get<any>(url, {headers});
  }

  getById(id): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/direccion-grados/${id}`;
    return this.http.get<any>(url, {headers});
  }

  postData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/direccion-grados`;
    return this.http.post<any>(url, data, {headers});
  }

  putData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/direccion-grados/${data.id}`;
    return this.http.put<any>(url, data, {headers});
  }

  cambiarEstado(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/direccion-grados/cambiarEstado`;
    return this.http.post<any>(url, data, {headers});
  }





}
