import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }


  postVotante(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/reportes/votantes`;
    return this.http.post<any>(url, data, {headers});
  }

  postPuestos(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/reportes/puestos`;
    return this.http.post<any>(url, data, {headers});
  }

  postMesas(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/reportes/mesasvotacion`;
    return this.http.post<any>(url, data, {headers});
  }

  postVotanteCodigo(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/reportes/votantes-codigo`;
    return this.http.post<any>(url, data, {headers});
  }

  postVotanteTicket(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/reportes/votantes-ticket`;
    return this.http.post<any>(url, data, {headers});
  }






}
