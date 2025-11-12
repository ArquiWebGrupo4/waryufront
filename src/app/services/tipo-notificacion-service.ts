import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Tipo_Notificacion } from '../models/Tipo_notificacion';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class TipoNotificacionService implements OnInit{
  private url = `${base_url}/Tipo_Notificacion`;
  private listacambio = new Subject<Tipo_Notificacion[]>();
  constructor(private http:HttpClient) {}
  
  ngOnInit(): void {}
  list () {
    return this.http.get<Tipo_Notificacion[]>(this.url);
  }
  
  insert(a:Tipo_Notificacion): Observable<string> {
    const payload = {
      id_Tipo_Notificacion: a.ID_TipoNotificacion,
      tipo_Tipo_Notificacion: a.Nombre
    }
    return this.http.post(this.url, payload, {responseType:'text'});
  }

  setList (listaNueva: Tipo_Notificacion[]) {
    this.listacambio.next(listaNueva);
  }

  getList() {
    return this.listacambio.asObservable();
  }

  listId(id:number) {
    console.log("El id a buscar es :", id);
    return this.http.get<Tipo_Notificacion>(`${this.url}/${id}`)
  }

  update(a:Tipo_Notificacion) {
    const payload = {
      id_Tipo_Notificacion: a.ID_TipoNotificacion,
      tipo_Tipo_Notificacion: a.Nombre
    };
    return this.http.put(`${this.url}`, payload, {responseType: 'text'});
  }

  delete (id:number) {
    return this.http.delete(`${this.url}/${id}`, {responseType: 'text'})
  }
}
