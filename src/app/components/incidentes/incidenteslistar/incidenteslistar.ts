import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Incidentes } from '../../../models/Incidentes';
import { IncidentesService } from '../../../services/incidentes-service';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-incidenteslistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './incidenteslistar.html',
  styleUrl: './incidenteslistar.css',
})
export class Incidenteslistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Incidentes> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','fk2','fk4','c2','c3','c5','c6', 'c7'];

  constructor(private iS: IncidentesService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.iS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.iS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
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
}
