import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class VotantesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votantes`;
    return this.http.get<any>(url, {headers});
  }

  getActive(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votantes-activos`;
    return this.http.get<any>(url, {headers});
  }

  validarDocumento(documento: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votantes-validar/${documento}`;
    return this.http.get<any>(url, {headers});
  }

  validarDocumentoAPI(documento: any): Observable<any> {
    let datos={
        'numerodocumento':documento
    };
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/consultarApi`;
    return this.http.post<any>(url, datos, {headers});
  }

  validarDocumentoFuente(documento: any): Observable<any> {
    let datos={
        'numerodocumento':documento
    };
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/validarDocumentoFuente`;
    return this.http.post<any>(url, datos, {headers});
  }

  fuentePost(data: any): Observable<any> {
    let datos={
        'data':data
    };
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/fuente`;
    return this.http.post<any>(url, datos, {headers});
  }



  getById(id): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votantes/${id}`;
    return this.http.get<any>(url, {headers});
  }

  postData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votantes`;
    return this.http.post<any>(url, data, {headers});
  }

  filtros(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votantes/filtros`;
    return this.http.post<any>(url, data, {headers});
  }

  putData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votantes/${data.id}`;
    return this.http.put<any>(url, data, {headers});
  }

  cambiarEstado(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votantes/cambiarEstado`;
    return this.http.post<any>(url, data, {headers});
  }

  eliminar(id): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votantes/${id}`;
    return this.http.delete<any>(url, {headers});
  }

  transferir(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votantes/tranferir-votantes`;
    return this.http.post<any>(url, data, {headers});
  }

  getdocumentosPuesto(data: any): Observable<any> {
    //const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votante/listado`;
    return this.http.post<any>(url, data);
  }
  enviarPuesto(data: any): Observable<any> {
    //const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votante/puesto`;
    return this.http.post<any>(url, data);
  }

  getDigitados(usuario): Observable<any> {
    let url=`${environment.baseURL}/totaldigitados/${usuario}`;
    return this.http.get<any>(url);
  }

  confirmarVoto(data: any): Observable<any> {
    //const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/confirmar`;
    return this.http.post<any>(url, data);
  }

  getIpPublica(): Observable<any> {
    let url=`https://api.ipify.org?format=json`;
    return this.http.get<any>(url);
  }

  getByIdPuesto(id, puesto): Observable<any> {
    //const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/votantes/${id}/${puesto}`;
    return this.http.get<any>(url);
  }





}
