import { Routes } from '@angular/router';
import { TipoNotificacion } from './components/tipo-notificacion/tipo-notificacion';
import { TiponotificacionRegistrar } from './components/tipo-notificacion/tiponotificacion-registrar/tiponotificacion-registrar';
export const routes: Routes = [
    {path:'tiponotificacion', component:TipoNotificacion,
        children: [
            {path:'news', component:TiponotificacionRegistrar},
            {path:'edits/:id',component:TiponotificacionRegistrar}
        ]
    }
];
