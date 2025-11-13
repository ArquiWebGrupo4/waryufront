import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Botonpanico } from '../../../models/Botonpanico';
import { BotonpanicoService } from '../../../services/botonpanico-service';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-botonpanicolistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './botonpanicolistar.html',
  styleUrl: './botonpanicolistar.css',
})
export class Botonpanicolistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Botonpanico> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'fk1', 'c2', 'c5', 'c6'];

  constructor(private iS: BotonpanicoService) {}

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
