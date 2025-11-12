//import { Incidentes } from "./Incidentes";
import { Usuarios } from "./Usuarios";

export class Reporte_Incidente {
    ID_Reporte: number=0;
    Descripcion: string="";
    Fecha: Date=new Date();
    ID_Incidente: number=0; //x mientras
    usuario: Usuarios=new Usuarios();

}