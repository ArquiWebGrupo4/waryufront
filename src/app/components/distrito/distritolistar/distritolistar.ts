import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Distrito } from '../../../models/Distrito';
import { DistritoService } from '../../../services/distrito-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';
@Component({
  selector: 'app-distritolistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './distritolistar.html',
  styleUrl: './distritolistar.css',
})
export class Distritolistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Distrito> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  constructor(private dS: DistritoService,private snackBar: MatSnackBar, private loginService: LoginService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {

    this.dS.list().subscribe((data) => {
      this.dataSource.data = data;
    });

    this.dS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });

    const rol = this.loginService.showRole();

    if (rol === 'ADMIN') {
      this.displayedColumns = ['c1', 'c2', 'c3', 'c4'];
    } else {
      this.displayedColumns = ['c1', 'c2'];
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  eliminar(id: number) {
    this.dS.delete(id).subscribe((data) => {
      this.dS.list().subscribe(data=>{
        this.dS.setList(data)
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      })
    });
  }
}
