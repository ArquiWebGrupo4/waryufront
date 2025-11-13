import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Botonpanico } from '../../../models/Botonpanico';
import { BotonpanicoService } from '../../../services/botonpanico-service';
@Component({
  selector: 'app-botonpanicolistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink,CommonModule],
  templateUrl: './botonpanicolistar.html',
  styleUrl: './botonpanicolistar.css',
})
export class Botonpanicolistar implements OnInit{
  dataSource: MatTableDataSource<Botonpanico> = new MatTableDataSource();
    displayedColumns: string[] = ['c1','fk1','c2','c5','c6']
  
    constructor(private  iS: BotonpanicoService) {}
  
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
