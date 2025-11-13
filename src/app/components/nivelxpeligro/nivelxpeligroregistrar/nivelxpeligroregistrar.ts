import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Nivelxpeligro } from '../../../models/nivelxpeligro';
import { NivelxpeligroService } from '../../../services/nivelxpeligro-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-nivelxpeligroregistrar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,],
  templateUrl: './nivelxpeligroregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './nivelxpeligroregistrar.css',
})
export class nivelxpeligroregistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  ni: Nivelxpeligro = new Nivelxpeligro();
  
  edicion: boolean = false;
  id: number = 0;
  
  constructor(
    private nS: NivelxpeligroService,
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
        nivel: ['', Validators.required],
      });
    }
    aceptar(): void {
      if (this.form.valid) {
        this.ni.id_nivel = this.form.value.codigo;
        this.ni.nivel = this.form.value.nivel;      
        if(this.edicion){
          this.nS.update(this.ni).subscribe((data) => {
            this.nS.list().subscribe((data) => {
              this.nS.setList(data);
            });
          });
        }else{
          this.nS.insert(this.ni).subscribe((data) => {
            this.nS.list().subscribe((data) => {
              this.nS.setList(data);
            });
          });
        }
        this.router.navigate(['niveles']);
      }
    }
  
    init() {
      if (this.edicion) {
      this.nS.listId(this.id).subscribe((data) => {
        const codigo = this.id;
        console.log(codigo);
        const nombre = data.nivel;
          this.form = new FormGroup({
            codigo: new FormControl(codigo),
            nivel: new FormControl(nombre),
          });
        });
      }
    }

}
