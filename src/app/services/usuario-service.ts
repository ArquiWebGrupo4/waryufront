import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../models/Usuarios';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService implements OnInit {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuarios[]>();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<Usuarios[]>(this.url);
  }
  insert(a: Usuarios): Observable<string> {
    return this.http.post(this.url, a, { responseType: 'text' });
  }

  setList(listaNueva: Usuarios[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Usuarios>(`${this.url}/${id}`);
  }
  listIdTodo(id: number) {
    return this.http.get<Usuarios>(`${this.url}/${id}/todo`);
  }
  update(a: Usuarios) {
    return this.http.put(`${this.url}`, a, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }
}
