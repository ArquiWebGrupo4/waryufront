import { Routes } from '@angular/router';
import { Distrito } from './components/distrito/distrito';
import { Interactuar } from './components/botonpanico/interactuar/interactuar';
import { Distritoregistrar } from './components/distrito/distritoregistrar/distritoregistrar';
import { Rol } from './components/rol/rol';
import { Rolregistrar } from './components/rol/rolregistrar/rolregistrar';
import {Nivelxpeligro} from './components/nivelxpeligro/nivelxpeligro';
import {nivelxpeligroregistrar} from './components/nivelxpeligro/nivelxpeligroregistrar/nivelxpeligroregistrar';

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
    }
    {path:'BotonPanico/interactuar',component:Interactuar}
];
