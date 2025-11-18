import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Incidentes } from '../../../models/Incidentes';
import { Nivelxpeligro } from '../../../models/nivelxpeligro';
import { Tipo_Incidente } from '../../../models/Tipo_Incidente';
import { Distrito } from '../../../models/Distrito';
import { Usuarios } from '../../../models/Usuarios';
import { UsuarioService } from '../../../services/usuario-service';
import { NivelxpeligroService } from '../../../services/nivelxpeligro-service';
import { TipoIncidenteService } from '../../../services/Tipo_Incidente_Service';
import { DistritoService } from '../../../services/distrito-service';
import { IncidentesService } from '../../../services/incidentes-service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-incidentesregistrar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './incidentesregistrar.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './incidentesregistrar.css',
})

export class Incidentesregistrar {
  form: FormGroup = new FormGroup({});
  inc: Incidentes = new Incidentes();
  edicion: boolean = false;
  id: number = 0;
  listausuarios:Usuarios[] = [];
  listaNivelPeligro: Nivelxpeligro[] = [];
  listaTipoIncidente: Tipo_Incidente[] = []
  listadistrito: Distrito[] = [];
  
  constructor(
    private iS:IncidentesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS:UsuarioService,
    private nS:NivelxpeligroService,
    private tS:TipoIncidenteService,
    private dS:DistritoService
  ) { } 

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
  });
    this.uS.list().subscribe((data) => { this.listausuarios = data });
    this.nS.list().subscribe((data) => { this.listaNivelPeligro = data });
    this.tS.list().subscribe((data) => { this.listaTipoIncidente = data });
    this.dS.list().subscribe((data) => { this.listadistrito = data });

    this.form = this.formBuilder.group({
      codigo: [''],
      fk1: ['', Validators.required],
      fk2: ['', Validators.required],
      fk3: ['', Validators.required],
      fk4: ['', Validators.required],
      imagen: ['', [Validators.required, Validators.maxLength(250)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      fechacreacion: ['', Validators.required],
      fechamodificacion: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  aceptar(): void {
    if(this.form.valid){
      this.inc.id_Incidente = this.form.value['codigo'];
      this.inc.usuario.id_Usuario = this.form.value['fk1'];
      this.inc.nivelPeligro.id_nivel = this.form.value['fk2'];
      this.inc.tipoIncidente.id_Tipo_Incidente = this.form.value['fk3'];
      this.inc.distrito.id_Distrito = this.form.value['fk4'];
      this.inc.imagen_URL = this.form.value['imagen'];
      this.inc.descripcion = this.form.value['descripcion'];
      this.inc.fecha_Creacion = this.form.value['fechacreacion'];
      this.inc.fecha_Modificacion = this.form.value['fechamodificacion'];
      this.inc.lat = this.form.value['latitud'];
      this.inc.lon = this.form.value['longitud'];
      if (this.edicion) {
        this.iS.update(this.inc).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      } else {
        this.iS.insert(this.inc).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      }
      this.router.navigate(['/Incidente']);
    }
  }

    init() {
      if (this.edicion) {
        this.iS.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
            codigo: new FormControl(data.id_Incidente),
            fk1: new FormControl(data.usuario.id_Usuario),
            fk2: new FormControl(data.nivelPeligro.id_nivel),
            fk3: new FormControl(data.tipoIncidente.id_Tipo_Incidente),
            fk4: new FormControl(data.distrito.id_Distrito),
            imagen: new FormControl(data.imagen_URL),
            descripcion: new FormControl(data.descripcion),
            fechacreacion: new FormControl(data.fecha_Creacion),
            fechamodificacion: new FormControl(data.fecha_Modificacion),
            latitud: new FormControl(data.lat),
            longitud: new FormControl(data.lon),
          });
        });
      }
    }
}

