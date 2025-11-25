import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

import { NivelxpeligroService } from '../../../services/nivelxpeligro-service';
import { Nivelxpeligro } from '../../../models/nivelxpeligro';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nivelxpeligrolistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './nivelxpeligrolistar.html',
  styleUrl: './nivelxpeligrolistar.css',
})
export class Nivelxpeligrolistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Nivelxpeligro> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private nS: NivelxpeligroService,private snackBar: MatSnackBar) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.nS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.nS.delete(id).subscribe(() => {
      this.nS.list().subscribe((data) => {
        this.nS.setList(data);
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      });
    });
  }
}
