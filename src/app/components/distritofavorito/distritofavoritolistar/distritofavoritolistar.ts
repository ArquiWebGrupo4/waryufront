import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DistritoFavoritoService } from '../../../services/distritofavorito-service';
import { DistritoFavorito } from '../../../models/DistritoFavorito';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuarios } from '../../../models/Usuarios';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-distritofavoritolistar',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './distritofavoritolistar.html',
  styleUrl: './distritofavoritolistar.css',
})
export class Distritofavoritolistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<DistritoFavorito> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','c2','cf','cfk','c3','c4'];
  form: FormGroup;
  listausuarios: Usuarios[] = [];
  rol = '';
  username = '';
  idusuario = 0;

  constructor(
    private dfS:DistritoFavoritoService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private uS:UsuarioService,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      fk: ['']
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private resetPaginator() {
    this.dataSource.paginator = this.paginator;
    this.paginator.firstPage();
  }

  ngOnInit(): void {
    this.rol = this.loginService.showRole()?.toUpperCase();
    this.username = this.loginService.showUsername();

    this.uS.list().subscribe((usuarios) => {
      this.listausuarios = usuarios;
      if (this.rol !== 'ADMIN') {
        const usuarioActual = this.listausuarios.find(u => u.nombreUsuario === this.username);
        if (usuarioActual) {
          this.idusuario = usuarioActual.id_Usuario;
          this.filtrarporUsuario(this.idusuario);
        }
      } else {
        this.dfS.list().subscribe((data) => {
          this.dataSource.data = data;
          this.resetPaginator();
        });
      }
    });

    this.dfS.getList().subscribe((data) => {
      if (this.rol === 'ADMIN') {
        this.dataSource.data = data;
      } else {
        const filtrados = data.filter(df => df.usuario?.nombreUsuario === this.username);
        this.dataSource.data = filtrados;
      }
    });

    this.form.get('fk')?.valueChanges.subscribe((idUsuarioSeleccionado) => {
      if (this.rol === 'ADMIN') {
        this.filtrarporUsuario(idUsuarioSeleccionado);
      }
    });

    if (this.rol === 'ADMIN') {
      this.displayedColumns = ['c1','c2','cf','cfk','c3','c4'];
    } else {
      this.displayedColumns = ['c1','c2','cf','cfk', 'c3'];
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id:number){
    this.dfS.delete(id).subscribe(() => {
      this.dfS.list().subscribe(data => {
        this.dfS.setList(data);
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      });
    });
  }

  filtrarporUsuario(valor: number){
    if(!valor){
      this.dfS.list().subscribe(data=>{
        this.dataSource.data = data;
        this.resetPaginator();
      });
    } else {
      this.dfS.list().subscribe(data=>{
        const filtrados = data.filter(df => df.usuario.id_Usuario === valor);
        this.dataSource.data = filtrados;
        this.resetPaginator();
      });
    }
  }
}
