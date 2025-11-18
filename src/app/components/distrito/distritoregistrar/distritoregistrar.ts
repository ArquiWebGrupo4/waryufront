import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Distrito } from '../../../models/Distrito';
import { DistritoService } from '../../../services/distrito-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-distritoregistrar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './distritoregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './distritoregistrar.css',
})
export class Distritoregistrar implements OnInit {
form: FormGroup = new FormGroup({});
  di: Distrito = new Distrito();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private dS: DistritoService,
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
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }
  //aceptar
  aceptar(): void {
    if (this.form.valid) {
      this.di.id_Distrito=this.form.value.codigo
      this.di.nombre = this.form.value.nombre;
      if(this.edicion){
        this.dS.update(this.di).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }else{
        this.dS.insert(this.di).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }
      this.router.navigate(['distritos']);
    }
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data: any) => {
        const codigo = data.id_Distrito;
        const nombre = data.nombre;
        this.form = new FormGroup({
          codigo: new FormControl(codigo),
          nombre: new FormControl(nombre),
        });
        
      });
    }
  }
}
