import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tipo_Incidente } from '../../../models/Tipo_Incidente';
import { TipoIncidenteService } from '../../../services/Tipo_Incidente_Service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipoincidentelistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './tipoincidentelistar.html',
  styleUrl: './tipoincidentelistar.css',
})
export class Tipoincidentelistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Tipo_Incidente> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private tS: TipoIncidenteService,private snackBar: MatSnackBar) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.tS.delete(id).subscribe(() => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      });
    });
  }
}
