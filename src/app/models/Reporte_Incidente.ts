//import { Incidentes } from "./Incidentes";
import { Incidentes } from "./Incidentes";
import { Usuarios } from "./Usuarios";

export class Reporte_Incidente {
    id_Reporte: number=0;
    usuario: Usuarios=new Usuarios();
    incidente: Incidentes   =new Incidentes();
    descripcion: string="";
    fecha: Date=new Date();
}