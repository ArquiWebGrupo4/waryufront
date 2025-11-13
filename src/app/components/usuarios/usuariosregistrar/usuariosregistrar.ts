import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule,
  FormBuilder, Validators, FormControl
 } from '@angular/forms';
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

@Component({
  selector: 'app-usuariosregistrar',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule,
    MatRadioModule, MatDatepickerModule, MatButtonModule, MatSelectModule
  ],
  templateUrl: './usuariosregistrar.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './usuariosregistrar.css',
})

export class Usuariosregistrar implements OnInit {
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
      nombre: ['', Validators.required],
      nombrecompleto: ['', Validators.required],
      email: ['', Validators.required],
      contrasenahash: ['', Validators.required],
      fecharegistro: ['', Validators.required],
      telefono: ['', Validators.required],
      telefonopanico: ['', Validators.required],
      mensaje: ['', Validators.required],
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
          nombre: new FormControl(data.nombreUsuario),
          nombrecompleto: new FormControl(data.nombreCompleto), 
          email: new FormControl(data.email),
          contrasenahash: new FormControl(data.contrasenahash),
          fecharegistro: new FormControl(data.fecha_Registro),  
          telefono: new FormControl(data.telefono),
          telefonopanico: new FormControl(data.telefono_Panico),
          mensaje: new FormControl(data.mensaje),
          fk:new FormControl(data.rol.id_Rol)
        });
      });
    }
  }
}
