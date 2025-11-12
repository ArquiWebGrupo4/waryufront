import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/Rol';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RolService implements OnInit {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Rol[]>();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<Rol[]>(this.url);
  }

  insert(a: Rol): Observable<string> {
    const payload = {
      id_Distrito: a.ID_Rol,
      nombre: a.Nombre
    };
    return this.http.post(this.url, payload, { responseType: 'text' });
  }

  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    console.log("El id a buscar es :", id);
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  update(a: Rol) {
      const payload = {
      id_Rol: a.ID_Rol,
      nombre: a.Nombre
    };
    return this.http.put(`${this.url}`, payload, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }
}