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
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechacreacion: ['', Validators.required],
      fechamodificacion: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  aceptar(): void {
    if(this.form.valid){
      this.inc.ID_Incidente = this.form.value['codigo'];
      this.inc.Usuario.ID_Usuario = this.form.value['fk1'];
      this.inc.nivelPeligro.ID_nivel = this.form.value['fk2'];
      this.inc.tipoIncidente.id_tipo_incidente = this.form.value['fk3'];
      this.inc.Distrito.ID_Distrito = this.form.value['fk4'];
      this.inc.Imagen_URL = this.form.value['imagen'];
      this.inc.Descripcion = this.form.value['descripcion'];
      this.inc.Fecha_Creacion = this.form.value['fechacreacion'];
      this.inc.Fecha_Modificacion = this.form.value['fechamodificacion'];
      this.inc.Lat = this.form.value['latitud'];
      this.inc.Lon = this.form.value['longitud'];
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
            codigo: new FormControl(data.ID_Incidente),
            fk1: new FormControl(data.Usuario.ID_Usuario),
            fk2: new FormControl(data.nivelPeligro.ID_nivel),
            fk3: new FormControl(data.tipoIncidente.id_tipo_incidente),
            fk4: new FormControl(data.Distrito.ID_Distrito),
            imagen: new FormControl(data.Imagen_URL),
            descripcion: new FormControl(data.Descripcion),
            fechacreacion: new FormControl(data.Fecha_Creacion),
            fechamodificacion: new FormControl(data.Fecha_Modificacion),
            latitud: new FormControl(data.Lat),
            longitud: new FormControl(data.Lon),
          });
        });
      }
    }
}

