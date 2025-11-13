import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Busqueda } from '../models/Busqueda';
import { Observable, Subject } from 'rxjs';
import { A } from '@angular/cdk/keycodes';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class BusquedaService implements OnInit {
  private url = `${base_url}/Busqueda`;
  private listaCambio = new Subject<Busqueda[]>();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<Busqueda[]>(this.url);
  }

  insert(a: Busqueda): Observable<string> {
    return this.http.post(this.url, a, { responseType: 'text' });
  }

  setList(listaNueva: Busqueda[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Busqueda>(`${this.url}/${id}`);
  }

  update(a: Busqueda) {
    return this.http.put(`${this.url}`, a, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }
}
