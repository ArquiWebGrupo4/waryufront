import { Tipo_Notificacion } from "./Tipo_notificacion"

export class Notificacion {
    ID_Notificacion: number = 0
    Mensaje: string = ""
    Fecha: Date = new Date()
    tipo_Notificacion:Tipo_Notificacion = new Tipo_Notificacion()
}