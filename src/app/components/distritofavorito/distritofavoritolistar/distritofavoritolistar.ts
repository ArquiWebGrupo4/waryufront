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

@Component({
  selector: 'app-distritofavoritolistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule, ReactiveFormsModule
    , MatSelectModule, MatFormFieldModule
  ],
  templateUrl: './distritofavoritolistar.html',
  styleUrl: './distritofavoritolistar.css',
})
export class Distritofavoritolistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<DistritoFavorito> = new MatTableDataSource();

  displayedColumns: string[] = ['c1','c2','cf','cfk','c3','c4'];
  
  constructor(private dfS:DistritoFavoritoService,private snackBar: MatSnackBar) {}
  form: FormGroup;
  listausuarios: Usuarios[] = [];
  constructor(private dfS:DistritoFavoritoService, private fb: FormBuilder, private uS:UsuarioService) {
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
    this.dfS.list().subscribe((data) => {
      this.dataSource.data = data;
      this.filtrarporUsuario(this.form.get('fk')?.value);
    });
    this.dfS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.uS.list().subscribe((usuarios) => {
      this.listausuarios = usuarios;
    });
    this.form.get('fk')?.valueChanges.subscribe((idUsuarioSeleccionado) => {
      this.filtrarporUsuario(idUsuarioSeleccionado);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  eliminar(id:number){
    this.dfS.delete(id).subscribe((data) => {
      this.dfS.list().subscribe(data => {
        this.dfS.setList(data)
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      });
    });
  }
  filtrarporUsuario(valor: string){
    if(!valor){
      this.dfS.list().subscribe(data=>{
        this.dataSource.data = data;
        this.resetPaginator();
      });
    } else {
      this.dfS.list().subscribe(data=>{
        const filtrados = data.filter((df: any) =>  df.usuario.id_Usuario  === valor);
        this.dataSource.data = filtrados;
        this.resetPaginator();
      });
    }
  }
}