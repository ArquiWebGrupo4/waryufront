import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notificacion } from '../models/Notificacion';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})

export class NotificacionService implements OnInit {

  private url = `${base_url}/Notificacion`;
  private listaCambio = new Subject<Notificacion[]>();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<Notificacion[]>(this.url);
  }
  insert(a: Notificacion): Observable<string> {
    return this.http.post(this.url, a, { responseType: 'text' });
  }

  setList(listaNueva: Notificacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Notificacion>(`${this.url}/${id}`);
  }
  update(a: Notificacion) {
    return this.http.put(`${this.url}`, a, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }

}
