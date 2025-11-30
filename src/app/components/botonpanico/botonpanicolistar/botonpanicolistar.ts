import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Botonpanico } from '../../../models/Botonpanico';
import { BotonpanicoService } from '../../../services/botonpanico-service';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuarios } from '../../../models/Usuarios';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-botonpanicolistar',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './botonpanicolistar.html',
  styleUrl: './botonpanicolistar.css',
})
export class Botonpanicolistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Botonpanico> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'fk1', 'c2', 'c5', 'c6'];
  form: FormGroup;
  listausuarios: Usuarios[] = [];
  rol = "";
  username = "";

  constructor(
    private iS: BotonpanicoService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private uS: UsuarioService,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      fechaInicio: [''],
      fechaFin: [''],
      fk: ['']
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private resetPaginator() {
    this.dataSource.paginator = this.paginator;
    this.paginator.firstPage();
  }

  ngOnInit(): void {
    this.rol = this.loginService.showRole();
    this.username = this.loginService.showUsername();
    this.iS.list().subscribe((data) => {
      let filtrados = data;
      if (this.rol !== 'ADMIN') {
        filtrados = filtrados.filter(item => item.usuario.nombreUsuario === this.username);
      }
      this.dataSource.data = filtrados;
    });

    this.iS.getList().subscribe((data) => {
      let filtrados = data;
      if (this.rol !== 'ADMIN') {
        filtrados = filtrados.filter(item => item.usuario.nombreUsuario === this.username);
      }
      this.dataSource.data = filtrados;
    });

    this.uS.list().subscribe((usuarios) => {
      this.listausuarios = usuarios;
    });

    if (this.rol === 'ADMIN') {
      this.displayedColumns = ['c1', 'fk1', 'c2', 'c5', 'c6'];
    } else {
      this.displayedColumns = ['c1', 'fk1', 'c2'];
    }

    this.form.get('fk')?.valueChanges.subscribe(() => this.filtrar());
    this.form.get('fechaInicio')?.valueChanges.subscribe(() => this.filtrar());
    this.form.get('fechaFin')?.valueChanges.subscribe(() => this.filtrar());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.iS.delete(id).subscribe(() => {
      this.iS.list().subscribe((data) => {
        this.iS.setList(data);
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      });
    });
  }

  filtrar() {
    const fechaInicio = this.form.get('fechaInicio')?.value;
    const fechaFin = this.form.get('fechaFin')?.value;
    const idUsuario = this.form.get('fk')?.value;

    this.iS.list().subscribe(data => {
      let filtrados = data;

      if (this.rol !== 'ADMIN') {
        filtrados = filtrados.filter(item => item.usuario.nombreUsuario === this.username);
      }

      if (idUsuario) {
        filtrados = filtrados.filter(item => item.usuario.id_Usuario === idUsuario);
      }

      if (fechaInicio && !fechaFin) {
        filtrados = filtrados.filter(item => new Date(item.fecha_Activacion) >= fechaInicio);
      }

      if (!fechaInicio && fechaFin) {
        filtrados = filtrados.filter(item => new Date(item.fecha_Activacion) <= fechaFin);
      }

      if (fechaInicio && fechaFin) {
        filtrados = filtrados.filter(item => {
          const fechaItem = new Date(item.fecha_Activacion);
          return fechaItem >= fechaInicio && fechaItem <= fechaFin;
        });
      }

      this.dataSource.data = filtrados;
      this.resetPaginator();
    });
  }

  reiniciarTabla() {
    this.form.reset();
    this.iS.list().subscribe(data => {
      let filtrados = data;
      if (this.rol !== 'ADMIN') {
        filtrados = filtrados.filter(item => item.usuario.nombreUsuario === this.username);
      }
      this.dataSource.data = filtrados;
      this.resetPaginator();
    });
  }
}
