import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { BusquedaService } from '../../../services/busqueda-service';
import { Busqueda } from '../../../models/Busqueda';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-busquedalistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './busquedalistar.html',
  styleUrl: './busquedalistar.css',
})
export class Busquedalistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Busqueda> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','c2','c3','c4','cf','c5','c6'];

  constructor(private bS: BusquedaService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.bS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.bS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.bS.delete(id).subscribe(() => {
      this.bS.list().subscribe((data) => {
        this.bS.setList(data);
      });
    });
  }
}
