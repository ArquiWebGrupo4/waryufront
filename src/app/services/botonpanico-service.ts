import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Botonpanico } from '../models/Botonpanico';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class BotonpanicoService implements OnInit {
  private url = `${base_url}/botonpanico`;
  private listaCambio = new Subject<Botonpanico[]>();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  
  interactuar() {
    const params = new HttpParams().set('idUsuario', String(environment.userid));
    return this.http.post(`${this.url}/interact`, {}, { params });
  }
  list() {
      return this.http.get<Botonpanico[]>(this.url);
    }
  
    insert(d: Botonpanico) : Observable<string> {
      return this.http.post(`${this.url}`, d, { responseType: 'text' });
    }
  
    setList(listaNueva: Botonpanico[]) {
      this.listaCambio.next(listaNueva);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
  
    listId(id: number) {
      return this.http.get<Botonpanico>(`${this.url}/${id}`);
    }
  
    update(d: Botonpanico) {
      return this.http.put(`${this.url}`, d, { responseType: 'text' });
    }
  
    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
    }
}
