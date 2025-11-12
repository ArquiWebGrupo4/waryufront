import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { NivelxpeligroService } from '../../../services/nivelxpeligro-service';
import { Nivelxpeligro } from '../../../models/nivelxpeligro';


@Component({
  selector: 'app-nivelxpeligrolistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './nivelxpeligrolistar.html',
  styleUrl: './nivelxpeligrolistar.css',
})
export class Nivelxpeligrolistar implements OnInit {
  dataSource: MatTableDataSource<Nivelxpeligro> = new MatTableDataSource();
  
    displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  
    constructor(private nS: NivelxpeligroService) {}
  
    ngOnInit(): void {
      this.nS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
      this.nS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
    eliminar(id: number) {
      this.nS.delete(id).subscribe((data) => {
        this.nS.list().subscribe(data=>{
          this.nS.setList(data)
        })
      });
    }


}
