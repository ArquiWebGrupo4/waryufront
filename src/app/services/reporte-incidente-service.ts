import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reporte_Incidente } from '../models/Reporte_Incidente';
import { Observable, Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
    providedIn: 'root',
})
export class ReporteIncidenteService implements OnInit {
    private url = `${base_url}/reportes`;
    private listacambio = new Subject<Reporte_Incidente[]>();
    constructor(private http: HttpClient) {
    }
    ngOnInit(): void {
        
    }

    list(){
        return this.http.get<Reporte_Incidente[]>(this.url);
    }
    insert(r: Reporte_Incidente): Observable<string> {
        return this.http.post(this.url, r, { responseType: 'text' });
    }

    setList(listaNueva: Reporte_Incidente[]) {
        this.listacambio.next(listaNueva);
    }

    getList() {
        return this.listacambio.asObservable();
    }

    listId(id: number) {
        return this.http.get<Reporte_Incidente>(`${this.url}/${id}`);
    }
    update(r: Reporte_Incidente) {
        return this.http.put(`${this.url}`, r, { responseType: 'text' });
    }
    delete(id: number) {
        return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
    }



}
