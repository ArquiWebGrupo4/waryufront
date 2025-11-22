import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuarios } from '../../../models/Usuarios';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-usuarioslistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './usuarioslistar.html',
  styleUrl: './usuarioslistar.css',
})
export class Usuarioslistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'cf', 'c5', 'c6', 'c7'];

  constructor(private uS: UsuarioService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
