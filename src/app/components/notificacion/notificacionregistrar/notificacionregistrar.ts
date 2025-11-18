import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Notificacion } from '../../../models/Notificacion';
import { Tipo_Notificacion } from '../../../models/Tipo_notificacion';
import { NotificacionService } from '../../../services/notificacion-service';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { TipoNotificacionService } from '../../../services/tipo-notificacion-service';


@Component({
  selector: 'app-notificacionregistrar',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule,
    MatRadioModule, MatDatepickerModule, MatButtonModule, MatSelectModule],
  templateUrl: './notificacionregistrar.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './notificacionregistrar.css',
})
export class Notificacionregistrar {
  form: FormGroup = new FormGroup({});
  noti: Notificacion = new Notificacion();
  edicion: boolean = false;
  id: number = 0;
  listatipoNotificacion: Tipo_Notificacion[] = [];
  constructor(
    private nS:NotificacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tS: TipoNotificacionService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((data:Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.tS.list().subscribe((data) => {
      this.listatipoNotificacion = data;
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      mensaje: ['', Validators.required],
      fecha: ['', Validators.required],
      fk:['',Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.noti.id_Notificacion = this.form.value['codigo'];
      this.noti.mensaje = this.form.value['mensaje'];
      this.noti.fecha = this.form.value['fecha'];
      this.noti.tipo_Notificacion.id_Tipo_Notificacion = this.form.value['fk'];
      
      if (this.edicion) {
        this.nS.update(this.noti).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      } else {
        this.nS.insert(this.noti).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      }
      this.router.navigate(['/Notificacion']);
    }
  }
  init() {
    if (this.edicion) {
      this.nS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id_Notificacion),
          mensaje: new FormControl(data.mensaje),
          fecha: new FormControl(data.fecha),
          fk:new FormControl(data.tipo_Notificacion.id_Tipo_Notificacion)
        });
      });
    }
  }

}
