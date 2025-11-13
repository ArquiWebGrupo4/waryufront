import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { BusquedaService } from '../../../services/busqueda-service';
import { Busqueda } from '../../../models/Busqueda';

@Component({
  selector: 'app-busquedalistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './busquedalistar.html',
  styleUrl: './busquedalistar.css',
})
export class Busquedalistar implements OnInit{
  dataSource: MatTableDataSource<Busqueda> = new MatTableDataSource();

  displayedColumns: string[] = ['c1','c2','c3','c4','cf','c5','c6'];
  
  constructor(private bS:BusquedaService) {}

  ngOnInit(): void {
    this.bS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.bS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id:number){
    this.bS.delete(id).subscribe((data) => {
      this.bS.list().subscribe(data => {
        this.bS.setList(data)
      });
    });
  }
}