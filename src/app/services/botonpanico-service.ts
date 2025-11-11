import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { response } from 'express';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class BotonpanicoService implements OnInit {
  private url = `${base_url}/botonpanico`;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  test() {
    console
    return this.http.post(`${this.url}/test`, {}, { responseType: 'text' }); 
  }
}
