import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DistritoFavorito } from '../../../models/DistritoFavorito';
import { DistritoFavoritoService} from '../../../services/distritofavorito-service';
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
import { DistritoService } from '../../../services/distrito-service';
import { Distrito } from '../../../models/Distrito';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-distritofavoritoregistrar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './distritofavoritoregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './distritofavoritoregistrar.css',
})
export class Distritofavoritoregistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  df: DistritoFavorito = new DistritoFavorito();
  edicion: boolean = false;
  id: number = 0;
  listaUsuarios: Usuarios[] = [];
  listaDistritos: Distrito[] = [];
  rol = '';
  username = '';
  idusuario = 0;

  estados: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'true' },
    { value: false, viewValue: 'false' },
  ];

  constructor(
    private dfS: DistritoFavoritoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private dS: DistritoService,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.rol = this.loginService.showRole()?.toUpperCase();
    this.username = this.loginService.showUsername();

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

    this.dS.list().subscribe((data) => {
      this.listaDistritos = data;
    });

    this.form = this.formBuilder.group({
      codigo:[''],
      estado: ['', Validators.required],
      fk:[this.idusuario, Validators.required],
      fkd:['',Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.df.id_DistritoFavorito = this.form.value.codigo;
      this.df.estado = this.form.value.estado;
      this.df.usuario.id_Usuario = this.form.value.fk;
      this.df.distrito.id_Distrito = this.form.value.fkd;
      if(this.edicion){
        this.dfS.update(this.df).subscribe(() => {
          this.dfS.list().subscribe((data) => {
            this.dfS.setList(data);
            this.snackBar.open('Actualización exitosa', 'Cerrar', { duration: 3000 });
          });
        });
      } else {
        this.dfS.insert(this.df).subscribe(() => {
          this.dfS.list().subscribe((data) => {
            this.dfS.setList(data);
            this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
          });
        });
      }
      this.router.navigate(['distritofavorito']);
    }
  }

  cancelar(): void {
    this.router.navigate(['distritofavorito']);
  }

  init() {
    if (this.edicion) {
      this.dfS.listId(this.id).subscribe((data: any) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id_DistritoFavorito, Validators.required),
          estado: new FormControl(data.estado, Validators.required),
          fk: new FormControl(data.usuario.id_Usuario, Validators.required),
          fkd: new FormControl(data.distrito.id_Distrito, Validators.required)
        });
      });
    }
  }
}
