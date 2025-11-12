import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Nivelxpeligro } from '../models/nivelxpeligro';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class NivelxpeligroService implements OnInit {
  private url = `${base_url}/Nivel_Peligro`;
  private listaCambio = new Subject<Nivelxpeligro[]>();
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  list() {
    return this.http.get<Nivelxpeligro[]>(this.url);
  }

  insert(a: Nivelxpeligro): Observable<string> {
    return this.http.post(this.url, a, { responseType: 'text' });
  }

  setList(listaNueva: Nivelxpeligro[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Nivelxpeligro>(`${this.url}/${id}`);
  }

  update(n: Nivelxpeligro) {
      const payload = {
      id_nivel: n.ID_nivel,
      nivel: n.nivel
    };
    return this.http.put(`${this.url}`, payload, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}