import { Distrito } from "./Distrito"
import { Nivelxpeligro } from "./nivelxpeligro"
import { Tipo_Incidente } from "./Tipo_Incidente"
import { Usuarios } from "./Usuarios"

export class Incidentes {
    id_Incidente:number = 0
    usuario:Usuarios = new Usuarios()
    nivelPeligro:Nivelxpeligro = new Nivelxpeligro()
    tipoIncidente:Tipo_Incidente = new Tipo_Incidente()
    distrito:Distrito = new Distrito()
    imagen_URL:string = ""
    descripcion:string = ""
    fecha_Creacion:string = ""
    fecha_Modificacion:string = ""
    lat:number = 0
    lon:number = 0
}