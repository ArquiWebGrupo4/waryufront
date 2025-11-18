import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion-service';


@Component({
  selector: 'app-notificacionlistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './notificacionlistar.html',
  styleUrl: './notificacionlistar.css',
})
export class Notificacionlistar implements OnInit {
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();

  displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6'];
  
  constructor(private uS:NotificacionService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id:number){
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data)
      });
    });
  }

}
