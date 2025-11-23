import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Incidentes } from '../models/Incidentes';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Conteo_IncidenteXTipoDTO } from '../models/Conteo_IncidenteXTipoDTO';
const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class IncidentesService implements OnInit{
  private url = `${base_url}/Incidente`;

  private listaCambio = new Subject<Incidentes[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  list() {
    return this.http.get<Incidentes[]>(this.url);
  }

  insert(d: Incidentes): Observable<string> {
    return this.http.post(this.url, d, { responseType: 'text' });
  }

  setList(listaNueva: Incidentes[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Incidentes>(`${this.url}/${id}`);
  }

  listIdTodo(id: number) {
    return this.http.get<Incidentes>(`${this.url}/${id}/todo`);
  }

  update(d: Incidentes) {
    return this.http.put(`${this.url}`, d, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
  }
  getcontar(): Observable<[Conteo_IncidenteXTipoDTO]> {
    return this.http.get<[Conteo_IncidenteXTipoDTO]>(`${this.url}/contador_IncidentesXTipo`);
  }

}
