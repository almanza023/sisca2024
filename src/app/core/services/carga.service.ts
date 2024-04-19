import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CargaService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga`;
    return this.http.get<any>(url, {headers});
  }

  getActive(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga-activos`;
    return this.http.get<any>(url, {headers});
  }

  getById(id): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga/${id}`;
    return this.http.get<any>(url, {headers});
  }

  postData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga`;
    return this.http.post<any>(url, data, {headers});
  }

  putData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga/${data.id}`;
    return this.http.put<any>(url, data, {headers});
  }

  cambiarEstado(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga/cambiarEstado`;
    return this.http.post<any>(url, data, {headers});
  }

  delete(id: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga/${id}`;
    return this.http.delete<any>(url, {headers});
  }

  filtrar(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga/filtrar`;
    return this.http.post<any>(url, data, {headers});
  }

  getAgregados(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga-agregados`;
    return this.http.get<any>(url, {headers});
  }

  agregar(data:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga-agregar`;
    return this.http.post<any>(url, data, {headers});
  }

  getGradosBySede(sede:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga-grados`;
    let data:any={};
    data.sede_id=sede;
    return this.http.post<any>(url, data, {headers});
  }

  getAsignaturasBySedeAndGrasdo(sede:any, grado:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga-asignaturas-grados`;
    let data:any={
        sede_id:sede,
        grado_id:grado
    };
    return this.http.post<any>(url, data, {headers});
  }

  getAsignaturasGrado(data:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga-asignaturas-grados`;
    return this.http.post<any>(url, data, {headers});
  }

  getAsignaturasByDocente(sede:any, grado:any, docente:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/carga-asignaturas-docentes`;
    let data:any={
        sede_id:sede,
        grado_id:grado,
        docente_id:docente
    };
    return this.http.post<any>(url, data, {headers});
  }





}
