import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DistritoFavorito } from '../models/DistritoFavorito';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class DistritoFavoritoService implements OnInit {
  private url = `${base_url}/DistritoFavorito`;
  private listaCambio = new Subject<DistritoFavorito[]>();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<DistritoFavorito[]>(this.url);
  }

  insert(a: DistritoFavorito): Observable<string> {

    return this.http.post(this.url, a, { responseType: 'text' });
  }

  setList(listaNueva: DistritoFavorito[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    console.log("El id a buscar es :", id);
    return this.http.get<DistritoFavorito>(`${this.url}/${id}`);
  }

  update(a: DistritoFavorito) {
    return this.http.put(`${this.url}`, a, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }

}
