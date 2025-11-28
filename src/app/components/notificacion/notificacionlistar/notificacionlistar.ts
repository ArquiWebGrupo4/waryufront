import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion-service';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';


@Component({
  selector: 'app-notificacionlistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './notificacionlistar.html',
  styleUrl: './notificacionlistar.css',
})
export class Notificacionlistar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();

  displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private uS:NotificacionService,private snackBar: MatSnackBar, private loginService: LoginService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
    const rol = this.loginService.showRole();
    if (rol === 'ADMIN') {
      this.displayedColumns = ['c1','c2','c3','c4','c5','c6'];
    } else {
      this.displayedColumns = ['c1','c2','c3','c4'];
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  eliminar(id:number){
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data)
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      });
    });
  }

}
