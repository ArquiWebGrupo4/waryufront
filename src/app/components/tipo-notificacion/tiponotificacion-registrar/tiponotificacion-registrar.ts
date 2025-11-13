import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Tipo_Notificacion } from '../../../models/Tipo_notificacion';
import { TipoNotificacionService } from '../../../services/tipo-notificacion-service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-tiponotificacion-registrar',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatRadioModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './tiponotificacion-registrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './tiponotificacion-registrar.css',
})
export class TiponotificacionRegistrar implements OnInit {
  form: FormGroup =  new FormGroup({});
    ti: Tipo_Notificacion = new Tipo_Notificacion();

    edicion: boolean = false;
    id:number = 0;

    constructor(private tS:TipoNotificacionService, private router:Router, private formbuilder: FormBuilder, private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.route.params.subscribe((data:Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });

      this.form = this.formbuilder.group({
        codigo:[''],
        nombre:['',Validators.required],
      });
    }

    aceptar(): void {
      if (this.form.valid) {
        this.ti.id_TipoNotificacion = this.form.value.codigo
        this.ti.nombre = this.form.value.nombre;
        if(this.edicion){
          this.tS.update(this.ti).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        } else {
          this.tS.insert(this.ti).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
            });
          });
        }
        this.router.navigate(['tiponotificacion'])
      }
    }

    init() {
      if (this.edicion) {
        this.tS.listId(this.id).subscribe((data:any) => {
          const codigo = this.id;
          const nombre = data.tipo_Tipo_Notificacion;
          this.form = new FormGroup({
            codigo: new FormControl(codigo),
            nombre: new FormControl(nombre),
          });
        });
      }
    }

}
