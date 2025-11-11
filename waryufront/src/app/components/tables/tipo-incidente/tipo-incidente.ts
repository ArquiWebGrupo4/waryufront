import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Tipo_Incidente } from '../../../models/Tipo_Incidente';
import { TipoIncidenteService } from '../../../services/Tipo_Incidente_Service';

@Component({
  selector: 'app-tipo-incidente',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatDatepickerModule],
  templateUrl: './tipo-incidente.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './tipo-incidente.css',
})
export class TipoIncidente implements OnInit {
  form: FormGroup = new FormGroup({});
  ar:Tipo_Incidente=new Tipo_Incidente();

  constructor(private formBuilder: FormBuilder, private router: Router, private tiS: TipoIncidenteService) {}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
      id_tipo_incidente: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      })
  }
  aceptar():void{
    this.ar.id_tipo_incidente=this.form.value['id_tipo_incidente'];
    this.ar.tipo=this.form.value['tipo'];
    this.tiS.insert(this.ar).subscribe(data=>{
      this.tiS.list().subscribe(data=>{
        this.tiS.setList(data);
      })
    })
  }

}
