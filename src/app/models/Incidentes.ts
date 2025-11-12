import { Distrito } from "./Distrito"
import { Nivelxpeligro } from "./nivelxpeligro"
import { Tipo_Incidente } from "./Tipo_Incidente"
import { Usuarios } from "./Usuarios"

export class Incidentes {
    ID_Incidente:number = 0
    Usuario:Usuarios = new Usuarios()
    nivelPeligro:Nivelxpeligro = new Nivelxpeligro()
    tipoIncidente:Tipo_Incidente = new Tipo_Incidente()
    Distrito:Distrito = new Distrito()
    Imagen_URL:string = ""
    Descripcion:string = ""
    Fecha_Creacion:string = ""
    Fecha_Modificacion:string = ""
    Lat:number = 0
    Lon:number = 0
}