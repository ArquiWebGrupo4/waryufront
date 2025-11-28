import { Component, Inject, OnInit } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';
declare const L: any;

@Component({
  selector: 'app-incidentesregistrar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    DatePipe
  ],
  templateUrl: './incidentesregistrar.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './incidentesregistrar.css',
})

export class Incidentesregistrar {
  getLocalDateTime(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    const hours = String(hoy.getHours()).padStart(2, '0');
    const minutes = String(hoy.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      this.http.post('https://api.imgbb.com/1/upload?key=296723c4cd1bd03a3e485ec0fbf9e349', formData)
        .subscribe((res: any) => {
          const imageUrl = res.data.display_url;
          this.form.get('imagen')?.setValue(imageUrl);
          this.form.get('imagen')?.updateValueAndValidity();
        });
    }
  }
  rol = "";
  username = "";
  idusuario: number = 0;
  form: FormGroup = new FormGroup({});
  inc: Incidentes = new Incidentes();
  edicion: boolean = false;
  id: number = 0;
  listausuarios:Usuarios[] = [];
  listaNivelPeligro: Nivelxpeligro[] = [];
  listaTipoIncidente: Tipo_Incidente[] = []
  listadistrito: Distrito[] = [];
  private map!: any;
  private markerLayer!: any;

  constructor(
    private iS:IncidentesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS:UsuarioService,
    private nS:NivelxpeligroService,
    private tS:TipoIncidenteService,
    private dS:DistritoService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { } 

  ngOnInit(): void {
    this.rol = this.loginService.showRole();
    this.username = this.loginService.showUsername();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
  });
    this.uS.list().subscribe((data) => {
      this.listausuarios = data;
        if (this.rol !== 'ADMIN') {
          const usuarioActual = this.listausuarios.find(user => user.nombreUsuario === this.username);
          if (usuarioActual) {
            this.idusuario = usuarioActual.id_Usuario;
            this.form.patchValue({fk1: this.idusuario });
          }
        }
    });
    this.nS.list().subscribe((data) => { this.listaNivelPeligro = data });
    this.tS.list().subscribe((data) => { this.listaTipoIncidente = data });
    this.dS.list().subscribe((data) => { this.listadistrito = data });

    this.form = this.formBuilder.group({
      codigo: [''],
      fk1: [this.idusuario, Validators.required],
      fk2: ['', Validators.required],
      fk3: ['', Validators.required],
      fk4: ['', Validators.required],
      imagen: ['', [Validators.required, Validators.maxLength(250)]],
      descripcion: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
      fechacreacion: [this.getLocalDateTime(), Validators.required],
      fechamodificacion: [this.getLocalDateTime(), Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const mapElement = document.getElementById('map');
      if (!mapElement) return;

      if (!this.map) {
        this.map = L.map(mapElement).setView([-12.0464, -77.0428], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
      }

      this.markerLayer = L.layerGroup().addTo(this.map);

      this.map.on('click', (e: any) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        this.markerLayer.clearLayers();
        const marker = L.marker([lat, lng], { draggable: true }).addTo(this.markerLayer);

        this.form.patchValue({ latitud: lat, longitud: lng });

        marker.on('dragend', (event: any) => {
          const pos = event.target.getLatLng();
          this.form.patchValue({ latitud: pos.lat, longitud: pos.lng });
        });
      });
    }
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
            this.snackBar.open('Actualización exitosa', 'Cerrar', { duration: 3000 });
          });
        });
      } else {
        this.iS.insert(this.inc).subscribe(() => {

          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
            this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
          });
        });
      }
      this.router.navigate(['/Incidente']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/Incidente']);
  }

    init() {
      if (this.edicion) {
        this.iS.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
            codigo: new FormControl(data.id_Incidente),
            fk1: new FormControl(data.usuario.id_Usuario, Validators.required),
            fk2: new FormControl(data.nivelPeligro.id_nivel, Validators.required),
            fk3: new FormControl(data.tipoIncidente.id_Tipo_Incidente, Validators.required),
            fk4: new FormControl(data.distrito.id_Distrito, Validators.required),
            imagen: new FormControl(data.imagen_URL, [Validators.required, Validators.maxLength(250)]),
            descripcion: new FormControl(data.descripcion, [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
            fechacreacion: new FormControl(data.fecha_Creacion),
            fechamodificacion: new FormControl(this.getLocalDateTime()),
            latitud: new FormControl(data.lat),
            longitud: new FormControl(data.lon),
          });
        });
      }
    }
}

