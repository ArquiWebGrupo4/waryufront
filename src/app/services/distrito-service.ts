import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Distrito } from '../models/Distrito';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class DistritoService implements OnInit {
  private url = `${base_url}/Distrito`;
  private listaCambio = new Subject<Distrito[]>();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<Distrito[]>(this.url);
  }

  insert(a: Distrito): Observable<string> {
    const payload = {
      id_Distrito: a.id_Distrito,
      nombre: a.nombre
    };
    return this.http.post(this.url, payload, { responseType: 'text' });
  }

  setList(listaNueva: Distrito[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    console.log("El id a buscar es :", id);
    return this.http.get<Distrito>(`${this.url}/${id}`);
  }

  update(a: Distrito) {
      const payload = {
      id_Distrito: a.id_Distrito,
      nombre: a.nombre
    };
    return this.http.put(`${this.url}`, payload, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }

  //prueba
}
