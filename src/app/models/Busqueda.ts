import { Usuarios } from "./Usuarios"

export class Busqueda {
    ID_Busqueda: number = 0
    Direccion: string = ""
    Palabra_Clave: string = ""
    Fecha: Date = new Date()
    usuario:Usuarios = new Usuarios()
}