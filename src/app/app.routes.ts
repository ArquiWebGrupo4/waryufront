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
import { Verusuario } from './components/usuarios/verusuario/verusuario';
import { ReporteIncidente } from './components/reporte-incidente/reporte-incidente';
import { Reporteincidenteregistrar } from './components/reporte-incidente/reporteincidenteregistrar/reporteincidenteregistrar';
import { Incidentes } from './components/incidentes/incidentes';
import { Incidentesregistrar } from './components/incidentes/incidentesregistrar/incidentesregistrar';
import { Busqueda } from './components/busqueda/busqueda';
import { Busquedaregistrar } from './components/busqueda/busquedaregistrar/busquedaregistrar';
import { Botonpanico } from './components/botonpanico/botonpanico';
import { Botonpanicoregistrar } from './components/botonpanico/botonpanicoregistrar/botonpanicoregistrar';
import { Distritofavorito } from './components/distritofavorito/distritofavorito';
import { Distritofavoritoregistrar } from './components/distritofavorito/distritofavoritoregistrar/distritofavoritoregistrar';
import { Notificacionregistrar } from './components/notificacion/notificacionregistrar/notificacionregistrar';
import { Notificacion } from './components/notificacion/notificacion';
import { Verincidente } from './components/incidentes/verincidente/verincidente';
import { Cantidadincidentextipo } from './components/cantidadincidentextipo/cantidadincidentextipo';
import { ContarPorTipoIncidente } from './components/contar-por-tipo-incidente/contar-por-tipo-incidente';
import { ReporteContarPorNivel } from './components/reportes/ReporteIncidente/reporte-contar-por-nivel/reporte-contar-por-nivel';
import { Distritopeligroso } from './components/distritopeligroso/distritopeligroso';
import { Autenticador } from './components/autenticador/autenticador';
import { seguridadGuard } from './guard/seguridad-guard';
import { HeatmapComponent } from './components/incidentes/heatmap/heatmap';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      }
      ,
      {
        path: 'login',
        component: Autenticador,
      },
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
    {path:'BotonPanico',component:Botonpanico,
        children:[
            {path:'news',component:Botonpanicoregistrar},
            {path:'edits/:id',component:Botonpanicoregistrar},
            {path:'interactuar',component:Interactuar}
        ]},
    
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
    {path:'usuarios', component:Usuarios, canActivate:[seguridadGuard],
        children: [
            {path:'news', component:Usuariosregistrar, canActivate:[seguridadGuard]},
            {path:'edits/:id',component:Usuariosregistrar, canActivate:[seguridadGuard]},
            {path:'ver/:id',component: Verusuario, canActivate:[seguridadGuard]}
        ]
    },
    {path:'reporteincidente', component:ReporteIncidente, canActivate:[seguridadGuard],
        children: [
            {path:'news', component:Reporteincidenteregistrar, canActivate:[seguridadGuard]},
            {path:'edits/:id',component:Reporteincidenteregistrar, canActivate:[seguridadGuard]}
        ]
    },
    {path:'Incidente', component:Incidentes,canActivate:[seguridadGuard],
        children: [
            {path:'news', component:Incidentesregistrar, canActivate:[seguridadGuard]},
            {path:'edits/:id',component:Incidentesregistrar, canActivate:[seguridadGuard]},
            {path:'ver/:id',component: Verincidente, canActivate:[seguridadGuard]},
            {path:'heatmap', component:HeatmapComponent, canActivate:[seguridadGuard]}
        ]
    },
    {path:'Busqueda', component:Busqueda, canActivate:[seguridadGuard],
        children: [
            {path:'news', component:Busquedaregistrar, canActivate:[seguridadGuard]},
            {path:'edits/:id',component:Busquedaregistrar, canActivate:[seguridadGuard]}
        ]
    },
    {path:'distritofavorito', component:Distritofavorito, canActivate:[seguridadGuard],
        children: [
            {path:'news', component: Distritofavoritoregistrar, canActivate:[seguridadGuard]},
            {path:'edits/:id',component:Distritofavoritoregistrar, canActivate:[seguridadGuard]}
        ]
    },
    {path:'Notificacion', component:Notificacion,
        children: [
            {path:'news', component:Notificacionregistrar, canActivate:[seguridadGuard]},
            {path:'edits/:id',component:Notificacionregistrar, canActivate:[seguridadGuard]}
        ]
    },
    {path:'homes', component:LandingPage, canActivate:[seguridadGuard]
    },
    {path:'menu', component:Menu
    },
    {
        path:'cantidadincidentextipo',component:Cantidadincidentextipo, canActivate:[seguridadGuard]
    },
    {
        path:'ContarPorTipoIncidente', component:ContarPorTipoIncidente, canActivate:[seguridadGuard]
    },
    {
        path:'reporte-contar-por-nivel', component:ReporteContarPorNivel, canActivate:[seguridadGuard]
    },
    { 
        path:'DistritoPeligroso', component:Distritopeligroso, canActivate:[seguridadGuard]
    }

];
