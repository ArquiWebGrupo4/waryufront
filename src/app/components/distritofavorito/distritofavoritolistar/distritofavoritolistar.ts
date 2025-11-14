import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DistritoFavoritoService } from '../../../services/distritofavorito-service';
import { DistritoFavorito } from '../../../models/DistritoFavorito';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-distritofavoritolistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './distritofavoritolistar.html',
  styleUrl: './distritofavoritolistar.css',
})
export class Distritofavoritolistar implements OnInit{
 dataSource: MatTableDataSource<DistritoFavorito> = new MatTableDataSource();

  displayedColumns: string[] = ['c1','c2','cf','cfk','c3','c4'];
  
  constructor(private dfS:DistritoFavoritoService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dfS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.dfS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  eliminar(id:number){
    this.dfS.delete(id).subscribe((data) => {
      this.dfS.list().subscribe(data => {
        this.dfS.setList(data)
      });
    });
  }
}