import { Routes } from '@angular/router';
import { Distrito } from './components/distrito/distrito';
import { Interactuar } from './components/botonpanico/interactuar/interactuar';
import { Distritoregistrar } from './components/distrito/distritoregistrar/distritoregistrar';
import { Rol } from './components/rol/rol';
import { Rolregistrar } from './components/rol/rolregistrar/rolregistrar';
import {Nivelxpeligro} from './components/nivelxpeligro/nivelxpeligro';
import {nivelxpeligroregistrar} from './components/nivelxpeligro/nivelxpeligroregistrar/nivelxpeligroregistrar';
import { TipoNotificacion } from './components/tipo-notificacion/tipo-notificacion';
import { TiponotificacionRegistrar } from './components/tipo-notificacion/tiponotificacion-registrar/tiponotificacion-registrar';
import { TipoIncidente } from './components/tipo-incidente/tipo-incidente';
import { Tipoincidenteregistrar} from './components/tipo-incidente/tipoincidenteregistrar/tipoincidenteregistrar';
import { LandingPage } from './components/landing-page/landing-page';
import {Menu} from './components/menu/menu';
import { Usuarios } from './components/usuarios/usuarios';
import { Usuariosregistrar } from './components/usuarios/usuariosregistrar/usuariosregistrar';
import { Incidentes } from './components/incidentes/incidentes';
import { Incidentesregistrar } from './components/incidentes/incidentesregistrar/incidentesregistrar';
export const routes: Routes = [
    {path:'distritos',component:Distrito,
        children:[
            {path:'news',component:Distritoregistrar},
            {path:'edits/:id',component:Distritoregistrar}
        ]
    },
    {path:'roles',component:Rol,
        children:[
            {path:'news',component:Rolregistrar},
            {path:'edits/:id',component:Rolregistrar}
        ]
    },
    {path:'niveles',component:Nivelxpeligro,
        children:[
            {path:'news',component:nivelxpeligroregistrar},
            {path:'edits/:id',component:nivelxpeligroregistrar}
        ]
    },
    {path:'BotonPanico/interactuar',component:Interactuar},
    
    {path:'tiponotificacion', component:TipoNotificacion,
        children: [
            {path:'news', component:TiponotificacionRegistrar},
            {path:'edits/:id',component:TiponotificacionRegistrar}
        ]
    },
    {path:'tipoincidente', component:TipoIncidente,
        children: [
            {path:'news', component:Tipoincidenteregistrar},
            {path:'edits/:id',component:Tipoincidenteregistrar}
        ]
    },
    {path:'usuarios', component:Usuarios,
        children: [
            {path:'news', component:Usuariosregistrar},
            {path:'edits/:id',component:Usuariosregistrar}
        ]
    },
    {path:'Incidente', component:Incidentes,
        children: [
            {path:'news', component:Incidentesregistrar},
            {path:'edits/:id',component:Incidentesregistrar}
        ]
    },
    {path:'', component:LandingPage
    },
    {path:'menu', component:Menu
    }
];
