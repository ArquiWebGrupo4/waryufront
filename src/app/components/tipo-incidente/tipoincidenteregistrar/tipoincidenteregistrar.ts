import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Tipo_Incidente } from '../../../models/Tipo_Incidente';
import { TipoIncidenteService } from '../../../services/Tipo_Incidente_Service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-tipoincidenteregistrar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,],
  templateUrl: './tipoincidenteregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './tipoincidenteregistrar.css',
})
export class Tipoincidenteregistrar implements OnInit {
form: FormGroup = new FormGroup({});
  di: Tipo_Incidente = new Tipo_Incidente();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private dS: TipoIncidenteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo:[''],
      nombre: ['', Validators.required],
    });
  }
  //aceptar
  aceptar(): void {
    console.log("llegue hasta aqui")
    if (this.form.valid) {
      this.di.id_tipo_incidente=this.form.value.codigo
      this.di.tipo = this.form.value.nombre;
      console.log("1er paso")
      if(this.edicion){
        console.log("edicion")
        this.dS.update(this.di).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }
      else{
        console.log("comenzando")
        this.dS.insert(this.di).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }
      this.router.navigate(['tipoincidente']);
    }
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data: any) => {
        const codigo = this.id;
        const nombre = data.tipo_Tipo_Incidente;
        this.form = new FormGroup({
          codigo: new FormControl(codigo),
          nombre: new FormControl(nombre),
        });
        
      });
    }
  }  

}
