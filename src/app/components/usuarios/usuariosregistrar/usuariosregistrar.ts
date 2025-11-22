import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule,
  FormBuilder, Validators, FormControl
 } from '@angular/forms';
import {DatePipe} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Usuarios } from '../../../models/Usuarios';
import { UsuarioService } from '../../../services/usuario-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol-service';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-usuariosregistrar',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule,
    MatRadioModule, MatDatepickerModule, MatButtonModule, MatSelectModule, DatePipe
  ],
  templateUrl: './usuariosregistrar.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './usuariosregistrar.css',
})

export class Usuariosregistrar implements OnInit {
  getLocalDateTime(): string {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    const hours = String(hoy.getHours()).padStart(2, '0');
    const minutes = String(hoy.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  esEmail(): (control: AbstractControl) => ValidationErrors | null {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return (control: AbstractControl): ValidationErrors | null => {
      const value = (control.value || '').trim();
      if (!value) return null;
      return regex.test(value) ? null : { esEmail: true };
    };
  }
  passwordCompleja(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const tieneMayuscula = /[A-Z]/.test(value);
      const tieneMinuscula = /[a-z]/.test(value);
      const tieneNumero = /[0-9]/.test(value);
      const tieneEspecial = /[^A-Za-z0-9]/.test(value);
      const valido = tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
      return valido ? null : { passwordCompleja: true };
    };
  }
  telefono9Digitos(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = (control.value || '').toString().trim();
      const regex = /^[0-9]{9}$/;
      return regex.test(value) ? null : { telefono9Digitos: true };
    };
  }

  form: FormGroup = new FormGroup({});
  user: Usuarios = new Usuarios();
  edicion: boolean = false;
  id: number = 0;
  listaRoles: Rol[] = [];
  constructor(
    private uS:UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private rS: RolService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.rS.list().subscribe((data) => {
      this.listaRoles = data;
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      nombrecompleto: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]],
      email: ['', [Validators.required, this.esEmail(), Validators.maxLength(40), Validators.minLength(5)]],
      contrasenahash: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64), this.passwordCompleja()]],
      fecharegistro: [
        this.getLocalDateTime(), 
        Validators.required
      ],
      telefono: ['', [Validators.required, this.telefono9Digitos()]],
      telefonopanico: ['', [Validators.required, this.telefono9Digitos()]],
      mensaje: ['', [Validators.required,Validators.minLength(10) , Validators.maxLength(200)]],
      fk:['',Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.user.id_Usuario = this.form.value.codigo;
      this.user.nombreUsuario = this.form.value.nombre;
      this.user.nombreCompleto = this.form.value.nombrecompleto;
      this.user.email = this.form.value.email;
      this.user.contrasenahash = this.form.value.contrasenahash;
      this.user.fecha_Registro = this.form.value.fecharegistro;
      this.user.telefono = this.form.value.telefono;
      this.user.telefono_Panico = this.form.value.telefonopanico;
      this.user.mensaje = this.form.value.mensaje;
      this.user.rol.id_Rol = this.form.value.fk
      if (this.edicion) {
        this.uS.update(this.user).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.user).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['usuarios']);
    }
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        console.log(data);
        this.form = new FormGroup({
          codigo: new FormControl(data.id_Usuario),
          nombre: new FormControl(data.nombreUsuario, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
          nombrecompleto: new FormControl(data.nombreCompleto, [Validators.required, Validators.minLength(8), Validators.maxLength(150)]), 
          email: new FormControl(data.email, [Validators.required, this.esEmail(), Validators.maxLength(40), Validators.minLength(5)]),
          contrasenahash: new FormControl(data.contrasenahash, [Validators.required, Validators.minLength(8), Validators.maxLength(64), this.passwordCompleja()]),
          fecharegistro: new FormControl(data.fecha_Registro, Validators.required),  
          telefono: new FormControl(data.telefono, [Validators.required, this.telefono9Digitos()]),
          telefonopanico: new FormControl(data.telefono_Panico, [Validators.required, this.telefono9Digitos()]),
          mensaje: new FormControl(data.mensaje, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
          fk:new FormControl(data.rol.id_Rol)
        });
      });
    }
  }
}
