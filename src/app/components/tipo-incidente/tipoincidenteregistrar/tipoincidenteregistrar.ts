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
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo:[''],
      nombre: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    });
  }
  //aceptar
  aceptar(): void {
    if (this.form.valid) {
      this.di.id_Tipo_Incidente=this.form.value.codigo
      this.di.tipo_Tipo_Incidente = this.form.value.nombre;
      if(this.edicion){
        this.dS.update(this.di).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
            this.snackBar.open('Actualización exitosa', 'Cerrar', { duration: 3000 });
          });
        });
      }
      else{
        console.log("comenzando")
        this.dS.insert(this.di).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
            this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
          });
        });
      }
      this.router.navigate(['tipoincidente']);
    }
  }

  cancelar(): void {
    this.router.navigate(['tipoincidente']);
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data: any) => {
        const codigo = this.id;
        const nombre = data.tipo_Tipo_Incidente;
        this.form = new FormGroup({
          codigo: new FormControl(codigo),
          nombre: new FormControl(nombre, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
        });
        
      });
    }
  }  

}
