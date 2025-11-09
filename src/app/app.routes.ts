import { Routes } from '@angular/router';
import { Distrito } from './components/distrito/distrito';
import { Distritoregistrar } from './components/distrito/distritoregistrar/distritoregistrar';
import { Rol } from './components/rol/rol';
import { Rolregistrar } from './components/rol/rolregistrar/rolregistrar';
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
    }
];
