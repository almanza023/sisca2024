import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ConvivenciaService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia`;
    return this.http.get<any>(url, {headers});
  }

  getActive(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia-activos`;
    return this.http.get<any>(url, {headers});
  }

  getById(id): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia/${id}`;
    return this.http.get<any>(url, {headers});
  }

  postData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia`;
    return this.http.post<any>(url, data, {headers});
  }

  putData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia/${data.id}`;
    return this.http.put<any>(url, data, {headers});
  }

  cambiarEstado(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia/cambiarEstado`;
    return this.http.post<any>(url, data, {headers});
  }

  delete(id: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia/${id}`;
    return this.http.delete<any>(url, {headers});
  }

  filtrar(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia/filtrar`;
    return this.http.post<any>(url, data, {headers});
  }


  getMatriculasBySedeAndGrado(data:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia-listado`;
    return this.http.post<any>(url, data, {headers});
  }

  getCalificacionesPeriodo(data:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia-periodo`;
    return this.http.post<any>(url, data, {headers});
  }

  getEstudiantes(data:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia-estudiantes`;
    return this.http.post<any>(url, data, {headers});
  }

  postDataIndividual(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia-individual`;
    return this.http.post<any>(url, data, {headers});
  }

  getNotaByMatricula(data:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia-matricula`;
    return this.http.post<any>(url, data, {headers});
  }

  getListadoEstudiantes(data:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/convivencia-listado-estudiantes`;
    return this.http.post<any>(url, data, {headers});
  }





}
