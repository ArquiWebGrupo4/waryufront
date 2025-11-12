import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Incidentes } from '../../../models/Incidentes';
import { IncidentesService } from '../../../services/incidentes-service';

@Component({
  selector: 'app-incidenteslistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink,CommonModule],
  templateUrl: './incidenteslistar.html',
  styleUrl: './incidenteslistar.css',
})
export class Incidenteslistar implements OnInit {
  dataSource: MatTableDataSource<Incidentes> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','fk1','fk2','fk3','fk4','c2','c3','c4','c5','c6']

  constructor(private  iS: IncidentesService) {}

  ngOnInit(): void {
    this.iS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.iS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id:number) {
    this.iS.delete(id).subscribe((data) => {
      this.iS.list().subscribe((data) => {
        this.iS.setList(data)
      });
    });
  }
}
