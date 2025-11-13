import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {BotonpanicoService} from '../../../services/botonpanico-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-interactuar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './interactuar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './interactuar.css',
})
export class Interactuar implements OnInit {
form: FormGroup = new FormGroup({});

  constructor(
    private bS: BotonpanicoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.init();
    });

    this.form = this.formBuilder.group({
      nombre: ['', Validators.required]
    });

  }
  aceptar(): void {
    this.bS.interactuar().subscribe({});
      console.log ("Se acaba de interactuar")
      this.router.navigate(['BotonPanico/interactuar']);
  }

  init() {
  }
}
