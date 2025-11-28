import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
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
import { BotonpanicoService } from '../../../services/botonpanico-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Botonpanico } from '../../../models/Botonpanico';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';
declare const L: any;

@Component({
  selector: 'app-botonpanicoregistrar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    DatePipe, NgIf],
  templateUrl: './botonpanicoregistrar.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './botonpanicoregistrar.css',
})



export class Botonpanicoregistrar implements OnInit, AfterViewInit{

  getLocalDateTime(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    const hours = String(hoy.getHours()).padStart(2, '0');
    const minutes = String(hoy.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  form: FormGroup = new FormGroup({});
  btns: Botonpanico = new Botonpanico();
  edicion: boolean = false;
  id: number = 0;
  listausuarios:Usuarios[] = [];
  listaNivelPeligro: Nivelxpeligro[] = [];
  listaTipoIncidente: Tipo_Incidente[] = []
  listadistrito: Distrito[] = [];
  rol = "";
  username = "";
  idusuario = 0;
  private map!: any;
  private markerLayer!: any;
  constructor(
    private iS:BotonpanicoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS:UsuarioService,
    private snackBar: MatSnackBar,
    private LoginService: LoginService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { } 

  ngOnInit(): void {
    this.rol = this.LoginService.showRole();
    console.log(this.rol);
    this.username = this.LoginService.showUsername();
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
        }
      }
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      fk1: [this.idusuario, Validators.required],
      fecha: [
        this.getLocalDateTime(),
        Validators.required
      ],
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
      this.btns.id_Boton_Panico = this.form.value['codigo'];
      this.btns.usuario.id_Usuario = this.form.value['fk1'];
      this.btns.fecha_Activacion = this.form.value['fecha'];
      this.btns.lat = this.form.value['latitud'];
      this.btns.lon = this.form.value['longitud'];
      if (this.edicion) {
        this.iS.update(this.btns).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
            this.snackBar.open('Actualización exitosa', 'Cerrar', { duration: 3000 });
          });
        });
      } 
      else {
        console.log(this.btns);
        this.iS.insert(this.btns).subscribe(() => {
          this.iS.list().subscribe((data) => {
            console.log(data);
            this.iS.setList(data);
            this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
          });
        });
      }
      this.router.navigate(['/BotonPanico']);
    }
  }

  cancelar(): void {
    this.router.navigate(['/BotonPanico']);
  }

    init() {
      if (this.edicion) {
        this.iS.listId(this.id).subscribe((data) => {
          console.log(data);
          this.form = new FormGroup({
            codigo: new FormControl(data.id_Boton_Panico, Validators.required),
            fk1: new FormControl(data.usuario.id_Usuario, Validators.required),
            fecha: new FormControl(data.fecha_Activacion, Validators.required),
            latitud: new FormControl(data.lat, Validators.required),
            longitud: new FormControl(data.lon, Validators.required)
          });
        });
      }
    }
}
