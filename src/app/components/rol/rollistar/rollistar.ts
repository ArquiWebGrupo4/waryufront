import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-rollistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './rollistar.html',
  styleUrl: './rollistar.css',
})
export class Rollistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private rS: RolService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe(() => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }
}
