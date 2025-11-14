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

export class Distritofavoritoregistrar {
form: FormGroup = new FormGroup({});
  df: DistritoFavorito = new DistritoFavorito();
  edicion: boolean = false;
  id: number = 0;
  listaUsuarios: Usuarios[] = [];
  listaDistritos: Distrito[] = [];

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
    private dS: DistritoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
        this.dS.list().subscribe((data) => {
      this.listaDistritos = data;
    });

    this.form = this.formBuilder.group({
      codigo:[''],
      estado: ['', Validators.required],
      fk:['',Validators.required],
      fkd:['',Validators.required]
    });
  }
  //aceptar
  aceptar(): void {
    if (this.form.valid) {
      this.df.id_DistritoFavorito =this.form.value.codigo
      this.df.estado = this.form.value.estado;
      this.df.usuario.id_Usuario = this.form.value.fk;
      this.df.distrito.id_Distrito = this.form.value.fkd;
      if(this.edicion){
        this.dfS.update(this.df).subscribe((data) => {
          this.dfS.list().subscribe((data) => {
            this.dfS.setList(data);
          });
        });
      }else{
        this.dfS.insert(this.df).subscribe((data) => {
          this.dfS.list().subscribe((data) => {
            this.dfS.setList(data);
          });
        });
      }
      this.router.navigate(['distritofavorito']);
    }
  }

  init() {
    if (this.edicion) {
      this.dfS.listId(this.id).subscribe((data: any) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id_DistritoFavorito),
          estado: new FormControl(data.estado),
          fk: new FormControl(data.usuario.id_Usuario),
          fkd: new FormControl(data.distrito.id_Distrito)
        });
        
      });
    }
  }
}
