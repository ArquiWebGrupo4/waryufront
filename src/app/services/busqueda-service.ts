import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Busqueda } from '../models/Busqueda';
import { Observable, Subject } from 'rxjs';

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
    const payload = {
      ID_Busqueda: a.ID_Busqueda,
      Direccion: a.Direccion,
      Palabra_Clave: a.Palabra_Clave,
      Fecha: a.Fecha,
      usuario: a.usuario,
    };
    return this.http.post(this.url, payload, { responseType: 'text' });
  }

  setList(listaNueva: Busqueda[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    console.log("El id a buscar es :", id);
    return this.http.get<Busqueda>(`${this.url}/${id}`);
  }

  update(a: Busqueda) {
      const payload = {
      ID_Busqueda: a.ID_Busqueda,
      Direccion: a.Direccion,
      Palabra_Clave: a.Palabra_Clave,
      Fecha: a.Fecha,
      usuario: a.usuario,
    };
    return this.http.put(`${this.url}`, payload, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }
}
