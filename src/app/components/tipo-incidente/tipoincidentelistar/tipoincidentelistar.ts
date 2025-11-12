import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tipo_Incidente } from '../../../models/Tipo_Incidente';
import { TipoIncidenteService } from '../../../services/Tipo_Incidente_Service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-tipoincidentelistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './tipoincidentelistar.html',
  styleUrl: './tipoincidentelistar.css',
})
export class Tipoincidentelistar {
  dataSource: MatTableDataSource<Tipo_Incidente> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private tS: TipoIncidenteService) {}

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.tS.delete(id).subscribe((data) => {
      this.tS.list().subscribe(data=>{
        this.tS.setList(data)
      })
    });
  }
}
