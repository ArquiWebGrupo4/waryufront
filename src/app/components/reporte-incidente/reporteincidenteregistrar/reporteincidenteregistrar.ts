import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReporteIncidenteService } from '../../../services/reporte-incidente-service';
import { Reporte_Incidente } from '../../../models/Reporte_Incidente';
import { Usuarios } from '../../../models/Usuarios';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioService } from '../../../services/usuario-service';
import { IncidentesService } from '../../../services/incidentes-service';
import { Incidentes } from '../../../models/Incidentes';
@Component({
  selector: 'app-reporteincidenteregistrar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './reporteincidenteregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './reporteincidenteregistrar.css',
})
export class Reporteincidenteregistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  ri: Reporte_Incidente = new Reporte_Incidente();

  edicion: boolean = false
  id: number = 0;
  listaUsuarios: Usuarios[] = [];
  listaIncidentes: Incidentes[] = [];
  constructor(
    private riS: ReporteIncidenteService,
    private router: Router,
    private formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private uS: UsuarioService,
     private iS : IncidentesService
    ) {}

    ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });
      this.uS.list().subscribe(data => {this.listaUsuarios = data});
      this.iS.list().subscribe(data => {this.listaIncidentes = data});
      this.form = this.formBuilder.group({
        codigo:[''],
        descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
        fecha: ['', Validators.required],
        id_Incidente: ['', Validators.required],
        id_Usuario: ['', Validators.required],
      });
    }
    aceptar(): void {
      if (this.form.valid) {
        this.ri.id_Reporte = this.form.value.codigo;
        this.ri.descripcion = this.form.value.descripcion;
        this.ri.fecha = this.form.value.fecha;
        this.ri.incidente.id_Incidente = this.form.value.id_Incidente;
        this.ri.usuario.id_Usuario = this.form.value.id_Usuario;
        if(this.edicion){
          this.riS.update(this.ri).subscribe((data) => {
            this.riS.list().subscribe((data) => {
              this.riS.setList(data);
            });
          });
        }else{
          this.riS.insert(this.ri).subscribe((data) => {
            this.riS.list().subscribe((data) => {
              this.riS.setList(data);
            });
        });

      }
      this.router.navigate(['reporteincidente']);
    }
}
    init() {
      if (this.edicion) {
      this.riS.listId(this.id).subscribe((data) => {
          console.log(data);
          this.form = new FormGroup({
            codigo: new FormControl(data.id_Reporte),
            descripcion: new FormControl(data.descripcion),
            fecha: new FormControl(data.fecha),
            id_Incidente: new FormControl(data.incidente.id_Incidente),
            id_Usuario: new FormControl(data.usuario.id_Usuario),
          });
        });
      }
    }
}
