import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }


  reporteBoletinPeriodo(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/reportes/boletin-periodo`;
    return this.http.post<any>(url, data, {headers});
  }

  reporteMatriculas(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/reportes/matriculas`;
    return this.http.post<any>(url, data, {headers});
  }

  reporteCalificaciones(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/reportes/calificaciones`;
    return this.http.post<any>(url, data, {headers});
  }

  reporteConsolidadoPeriodo(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/reportes/consolidado-periodo`;
    return this.http.post<any>(url, data, {headers});
  }








}