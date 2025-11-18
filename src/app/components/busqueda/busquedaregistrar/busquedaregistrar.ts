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
@Component({
  selector: 'app-busquedaregistrar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './busquedaregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './busquedaregistrar.css',
})

export class Busquedaregistrar implements OnInit {
form: FormGroup = new FormGroup({});
  bu: Busqueda = new Busqueda();
  edicion: boolean = false;
  id: number = 0;
  listaUsuarios: Usuarios[] = [];

  constructor(
    private bS: BusquedaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuarioService
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

    this.form = this.formBuilder.group({
      codigo:[''],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      palabra_Clave: ['', [Validators.required, Validators.maxLength(30)]],
      fecha: ['', Validators.required],
      fk:['',Validators.required]
    });
  }
  //aceptar
  aceptar(): void {
    if (this.form.valid) {
      this.bu.id_Busqueda=this.form.value.codigo
      this.bu.direccion = this.form.value.direccion;
      this.bu.palabra_Clave = this.form.value.palabra_Clave;
      this.bu.fecha = this.form.value.fecha;
      this.bu.usuario.id_Usuario = this.form.value.fk;
      if(this.edicion){
        this.bS.update(this.bu).subscribe((data) => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        });
      }else{
        this.bS.insert(this.bu).subscribe((data) => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        });
      }
      this.router.navigate(['Busqueda']);
    }
  }

  init() {
    if (this.edicion) {
      this.bS.listId(this.id).subscribe((data: any) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id_Busqueda),
          direccion: new FormControl(data.direccion),
          palabra_Clave: new FormControl(data.palabra_Clave),
          fecha: new FormControl(data.fecha),
          fk: new FormControl(data.usuario.id_Usuario),
        });
        
      });
    }
  }
}
