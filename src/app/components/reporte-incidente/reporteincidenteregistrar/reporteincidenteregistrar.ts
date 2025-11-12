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

  constructor(
    private riS: ReporteIncidenteService,
    private router: Router,
    private formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private uS: UsuarioService
    ) {}

    ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });
      this.uS.list().subscribe(data => {this.listaUsuarios = data});

      this.form = this.formBuilder.group({
        codigo:['', Validators.required],
        descripcion: ['', Validators.required],
        fecha: ['', Validators.required],
        id_incidente: ['', Validators.required],
        id_usuario: ['', Validators.required],
      });
    }
    aceptar(): void {
      if (this.form.valid) {
        this.ri.ID_Reporte = this.form.value.codigo;
        this.ri.Descripcion = this.form.value.descripcion;
        this.ri.Fecha = this.form.value.fecha;
        this.ri.ID_Incidente = this.form.value.id_incidente;
        this.ri.usuario.ID_Usuario = this.form.value.id_usuario;
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
      this.router.navigate(['reportes']);
    }
}
    init() {
      if (this.edicion) {
      this.riS.listId(this.id).subscribe((data) => {
        
          this.form = new FormGroup({
            codigo: new FormControl(data.ID_Reporte),
            descripcion: new FormControl(data.Descripcion),
            fecha: new FormControl(data.Fecha),
            id_incidente: new FormControl(data.ID_Incidente),
            id_usuario: new FormControl(data.usuario.ID_Usuario),
          });
        });
      }
    }
}
