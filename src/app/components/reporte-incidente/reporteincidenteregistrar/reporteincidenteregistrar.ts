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
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';
@Component({
  selector: 'app-reporteincidenteregistrar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    DatePipe],
  templateUrl: './reporteincidenteregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './reporteincidenteregistrar.css',
})
export class Reporteincidenteregistrar implements OnInit {
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
  ri: Reporte_Incidente = new Reporte_Incidente();
  rol = "";
  username = ""
  edicion: boolean = false
  idusuario: number = 0;
  id: number = 0;
  listaUsuarios: Usuarios[] = [];
  listaIncidentes: Incidentes[] = [];
  constructor(
    private riS: ReporteIncidenteService,
    private router: Router,
    private formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private uS: UsuarioService,
     private iS : IncidentesService,
     private snackBar: MatSnackBar,
      private LoginService: LoginService
    ) {}

    ngOnInit(): void {
      this.rol = this.LoginService.showRole();
      this.username = this.LoginService.showUsername();
      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });
      this.uS.list().subscribe(data => {
        this.listaUsuarios = data;
        if (this.rol !== 'ADMIN') {
          const usuarioActual = this.listaUsuarios.find(user => user.nombreUsuario === this.username);
          if (usuarioActual) {
            this.idusuario = usuarioActual.id_Usuario;
            this.form.patchValue({ id_Usuario: this.idusuario });
          }
        }
      });
      this.iS.list().subscribe(data => {this.listaIncidentes = data});
      console.log(this.idusuario);
      this.form = this.formBuilder.group({
        codigo:[''],
        descripcion: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
        fecha: [this.getLocalDateTime(), Validators.required],
        id_Incidente: ['', Validators.required],
        id_Usuario: [this.idusuario, Validators.required],
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
              this.snackBar.open('Actualización exitosa', 'Cerrar', { duration: 3000 });
            });
          });
        }else{
          this.riS.insert(this.ri).subscribe((data) => {
            this.riS.list().subscribe((data) => {
              this.riS.setList(data);
              this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
            });
        });

      }
      this.router.navigate(['reporteincidente']);
    }
    
}

  cancelar(): void {
      this.router.navigate(['reporteincidente']);
    }
    
    init() {
      if (this.edicion) {
      this.riS.listId(this.id).subscribe((data) => {
          console.log(data);
          this.form = new FormGroup({
            codigo: new FormControl(data.id_Reporte),
            descripcion: new FormControl(data.descripcion, [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]),
            fecha: new FormControl(data.fecha, Validators.required),
            id_Incidente: new FormControl(data.incidente.id_Incidente, Validators.required),
            id_Usuario: new FormControl(data.usuario.id_Usuario, Validators.required),
          });
        });
      }
    }
}
