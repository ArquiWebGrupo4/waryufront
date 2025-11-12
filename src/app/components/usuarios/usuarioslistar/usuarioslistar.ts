
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuarios } from '../../../models/Usuarios';

@Component({
  selector: 'app-usuarioslistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './usuarioslistar.html',
  styleUrl: './usuarioslistar.css',
})
export class Usuarioslistar implements OnInit{
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();

  displayedColumns: string[] = ['c1','c2','c3','c4','cf','c5','c6'];
  
  constructor(private uS:UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id:number){
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data)
      });
    });
  }
}
