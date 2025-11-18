import { Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Rol} from '../../../models/Rol';
import { RolService } from '../../../services/rol-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-rolregistrar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './rolregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './rolregistrar.css',
})
export class Rolregistrar implements OnInit {
form: FormGroup = new FormGroup({});
  di: Rol = new Rol();
  
  edicion: boolean = false;
  id: number = 0;
  
  constructor(
    private rS: RolService,
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
        nombre: ['', [Validators.required, Validators.maxLength(20)]],
      });
    }
    aceptar(): void {
      if (this.form.valid) {
        this.di.id_Rol=this.form.value.codigo
        this.di.nombre = this.form.value.nombre;
        if(this.edicion){
          this.rS.update(this.di).subscribe((data) => {
            this.rS.list().subscribe((data) => {
              this.rS.setList(data);
            });
          });
        }else{
          this.rS.insert(this.di).subscribe((data) => {
            this.rS.list().subscribe((data) => {
              this.rS.setList(data);
            });
          });
        }
        this.router.navigate(['roles']);
      }
    }
  
    init() {
      if (this.edicion) {
        this.rS.listId(this.id).subscribe((data: any) => {
          console.log(data);
          const codigo = data.id_Rol;
          const nombre = data.nombre;
          this.form = new FormGroup({
            codigo: new FormControl(codigo),
            nombre: new FormControl(nombre),
          });
          
        });
      }
    }
}
