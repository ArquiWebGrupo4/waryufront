import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Busqueda } from '../../../models/Busqueda';
import { BusquedaService} from '../../../services/busqueda-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Usuarios } from '../../../models/Usuarios';
import { UsuarioService } from '../../../services/usuario-service';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-busquedaregistrar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    DatePipe,
  ],
  templateUrl: './busquedaregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './busquedaregistrar.css',
})
export class Busquedaregistrar implements OnInit {
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
  bu: Busqueda = new Busqueda();
  edicion: boolean = false;
  id: number = 0;
  listaUsuarios: Usuarios[] = [];
  rol = '';
  username = '';
  idusuario = 0;

  constructor(
    private bS: BusquedaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.rol = this.loginService.showRole();
    this.username = this.loginService.showUsername();
    console.log(this.rol);
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
      if (this.rol !== 'ADMIN') {
        const usuarioActual = this.listaUsuarios.find(u => u.nombreUsuario === this.username);
        if (usuarioActual) {
          this.idusuario = usuarioActual.id_Usuario;
          this.form.patchValue({ fk: this.idusuario });
        }
      }
    });

    this.form = this.formBuilder.group({
      codigo:[''],
      direccion: ['', [Validators.required, Validators.minLength(15),Validators.maxLength(100)]],
      palabra_Clave: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      fecha: [this.getLocalDateTime(), Validators.required],
      fk:[this.idusuario, Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.bu.id_Busqueda=this.form.value.codigo;
      this.bu.direccion = this.form.value.direccion;
      this.bu.palabra_Clave = this.form.value.palabra_Clave;
      this.bu.fecha = this.form.value.fecha;
      this.bu.usuario.id_Usuario = this.form.value.fk;
      if(this.edicion){
        this.bS.update(this.bu).subscribe(() => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
            this.snackBar.open('Actualización exitosa', 'Cerrar', { duration: 3000 });
            this.router.navigate(['Busqueda']);
          });
        });
      } else {
        this.bS.insert(this.bu).subscribe(() => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
            this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
            this.router.navigate(['Busqueda']);
          });
        });
      }
    }
  }

  cancelar(): void { 
    this.router.navigate(['Busqueda']);
  }

  init() {
    if (this.edicion) {
      this.bS.listId(this.id).subscribe((data: any) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id_Busqueda),
          direccion: new FormControl(data.direccion, [Validators.required, Validators.minLength(15),Validators.maxLength(100)]),
          palabra_Clave: new FormControl(data.palabra_Clave, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
          fecha: new FormControl(data.fecha, Validators.required),
          fk: new FormControl(data.usuario.id_Usuario, Validators.required),
        });
      });
    }
  }
}
