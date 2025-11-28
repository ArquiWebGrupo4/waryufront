import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { BusquedaService } from '../../../services/busqueda-service';
import { Busqueda } from '../../../models/Busqueda';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';
@Component({
  selector: 'app-busquedalistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './busquedalistar.html',
  styleUrl: './busquedalistar.css',
})
export class Busquedalistar implements OnInit, AfterViewInit {
  rol = "";
  username = "";
  dataSource: MatTableDataSource<Busqueda> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','c2','c3','c4','cf','c5','c6'];

  constructor(private bS: BusquedaService,private snackBar: MatSnackBar, private loginService: LoginService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
  this.rol = this.loginService.showRole();
  this.username = this.loginService.showUsername();

  this.bS.list().subscribe((data) => {
    let filtrados = data;
    console.log(data);
    if (this.rol !== 'ADMIN') {
        filtrados = filtrados.filter(item => item.usuario?.nombreUsuario === this.username);
      }
      this.dataSource.data = filtrados;
    });

    this.bS.getList().subscribe((data) => {
      let filtrados = data;
      if (this.rol !== 'ADMIN') {
        filtrados = filtrados.filter(item => item.usuario?.nombreUsuario === this.username);
      }
      this.dataSource.data = filtrados;
    });

    if (this.rol === 'ADMIN') {
      this.displayedColumns = ['c1','c2','c3','c4','cf','c5','c6'];
    } else {
      this.displayedColumns = ['c1','c2','c3','c4','cf'];
    }
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.bS.delete(id).subscribe(() => {
      this.bS.list().subscribe((data) => {
        this.bS.setList(data);
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      });
    });
  }
}
