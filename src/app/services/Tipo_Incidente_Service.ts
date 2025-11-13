import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipo_Incidente } from '../models/Tipo_Incidente';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class TipoIncidenteService implements OnInit {
  private url = `${base_url}/Tipo_Incidente`;
  private listaCambio = new Subject<Tipo_Incidente[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

  }
  list(){
    return this.http.get<Tipo_Incidente[]>(this.url)
  }

  insert(a:Tipo_Incidente): Observable<string>{
    console.log(a.id_Tipo_Incidente);
    console.log(a.tipo);
    const payload = {
      id_Tipo_Incidente: a.id_Tipo_Incidente,
      tipo_Tipo_Incidente: a.tipo,
      
    };
    return this.http.post(this.url,payload,{responseType:'text'});
  }
  setList(listaNueva: Tipo_Incidente[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
      console.log("El id a buscar es :", id);
      return this.http.get<Tipo_Incidente>(`${this.url}/${id}`);
    }
  
    update(a: Tipo_Incidente) {
        const payload = {
        id_Tipo_Incidente: a.id_Tipo_Incidente,
        tipo_Tipo_Incidente: a.tipo
      };
      return this.http.put(`${this.url}`, payload, { responseType: 'text' });
    }
  
    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' })
    }

}