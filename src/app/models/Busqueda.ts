import { Usuarios } from "./Usuarios"

export class Busqueda {
    id_Busqueda: number = 0
    direccion: string = ""
    palabra_Clave: string = ""
    fecha: Date = new Date()
    usuario:Usuarios = new Usuarios()
}