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
import { BotonpanicoService } from '../../../services/botonpanico-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Botonpanico } from '../../../models/Botonpanico';
@Component({
  selector: 'app-botonpanicoregistrar',
  imports: [    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './botonpanicoregistrar.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './botonpanicoregistrar.css',
})
export class Botonpanicoregistrar {
form: FormGroup = new FormGroup({});
  btns: Botonpanico = new Botonpanico();
  edicion: boolean = false;
  id: number = 0;
  listausuarios:Usuarios[] = [];
  listaNivelPeligro: Nivelxpeligro[] = [];
  listaTipoIncidente: Tipo_Incidente[] = []
  listadistrito: Distrito[] = [];
  
  constructor(
    private iS:BotonpanicoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS:UsuarioService
  ) { } 

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
  });
    this.uS.list().subscribe((data) => { this.listausuarios = data });

    this.form = this.formBuilder.group({
      codigo: [''],
      fk1: ['', Validators.required],
      fecha: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
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
          });
        });
      } 
      else {
        console.log(this.btns);
        this.iS.insert(this.btns).subscribe(() => {
          this.iS.list().subscribe((data) => {
            console.log(data);
            this.iS.setList(data);
          });
        });
      }
      this.router.navigate(['/BotonPanico']);
    }
  }

    init() {
      if (this.edicion) {
        this.iS.listId(this.id).subscribe((data) => {
          console.log(data);
          this.form = new FormGroup({
            codigo: new FormControl(data.id_Boton_Panico),
            fk1: new FormControl(data.usuario.id_Usuario),
            fecha: new FormControl(data.fecha_Activacion),
            latitud: new FormControl(data.lat),
            longitud: new FormControl(data.lon)
          });
        });
      }
    }
}
