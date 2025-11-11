import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipo_Incidente } from '../models/Tipo_Incidente';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class TipoIncidenteService implements OnInit {
  private url = `${base_url}/Tipo_Incidente`;
  private listaCambio = new Subject<Tipo_Incidente[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

  }
  list(){
    return this.http.get<Tipo_Incidente[]>(this.url)
  }

  insert(a:Tipo_Incidente): Observable<string>{
    return this.http.post(this.url,a,{responseType:'text'});
  }
  setList(listaNueva: Tipo_Incidente[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }


}