import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ClienteBloqueo } from '../interface/ClienteBloqueo';

@Injectable({
  providedIn: 'root'
})
export class ClienteBloqueoService {

  constructor(private http: HttpClient) { }  
  
  getClientes(): Observable<any> {
    let url=`${environment.baseURL}/Api/ClientesBloqueo/GetClientesBloqueo`;   
    return this.http.get<any>(url);
  }

  postCliente(data: ClienteBloqueo): Observable<any> {
    let url=`${environment.baseURL}/Api/ClientesBloqueo/PostClientesBloqueo`;   
    return this.http.post<any>(url, data);
  }

  getClientesRemuner(): Observable<any> {
    let url=`${environment.baseURL}/Api/ClientesBloqueo/GetClientesRemuner`;   
    return this.http.get<any>(url);
  }

}
