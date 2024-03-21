import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  constructor(private http: HttpClient) { }


  getEstadisticas(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/estadisticas`;
    return this.http.get<any>(url, {headers});
  }

  getEstadisticaLideres(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/estadisticas-lideres`;
    return this.http.get<any>(url, {headers});
  }

  getEstadisticaGeneral(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/reportes/estadisticas`;
    return this.http.post<any>(url, {}, {headers});
  }

  getTotalConfirmadosUsuario(usuario): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/total/${usuario}`;
    return this.http.get<any>(url, {headers});
  }







}
