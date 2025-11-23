import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Incidentes } from '../../../models/Incidentes';
import { IncidentesService } from '../../../services/incidentes-service';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DistritoService } from '../../../services/distrito-service';
import { Distrito } from '../../../models/Distrito';
@Component({
  selector: 'app-incidenteslistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink,
     CommonModule, MatPaginatorModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule
     , MatInputModule, MatNativeDateModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './incidenteslistar.html',
  styleUrl: './incidenteslistar.css',
})
export class Incidenteslistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Incidentes> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','fk2','fk4','c2','c3','c5','c6', 'c7'];
  form: FormGroup;
  listadistritos: Distrito[] = [];
  constructor(private iS: IncidentesService, private fb: FormBuilder, private dS: DistritoService) {
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
    this.iS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.iS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.dS.list().subscribe((distritos) => {
      this.listadistritos = distritos;
    });

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
      });
    });
  }

  filtrar() {
    const fechaInicio = this.form.get('fechaInicio')?.value;
    const fechaFin = this.form.get('fechaFin')?.value;
    const idDistrito = this.form.get('fk')?.value;

    this.iS.list().subscribe(data => {
      let filtrados = data;

      if (idDistrito) {
        filtrados = filtrados.filter(item => item.distrito.id_Distrito === idDistrito);
      }

      if (fechaInicio && !fechaFin) {
        filtrados = filtrados.filter(item => {
          const fechaItem = new Date(item.fecha_Creacion);
          return fechaItem >= fechaInicio;
        });
      }

      if (!fechaInicio && fechaFin) {
        filtrados = filtrados.filter(item => {
          const fechaItem = new Date(item.fecha_Creacion);
          return fechaItem <= fechaFin;
        });
      }

      if (fechaInicio && fechaFin) {
        filtrados = filtrados.filter(item => {
          const fechaItem = new Date(item.fecha_Creacion);
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
      this.dataSource.data = data;
      this.resetPaginator();
    });
  }
}
