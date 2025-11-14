import { Tipo_Notificacion } from "./Tipo_notificacion"
export class Notificacion {
    id_Notificacion: number = 0
    mensaje: string = ""
    fecha: Date = new Date()
    tipo_Notificacion:Tipo_Notificacion = new Tipo_Notificacion()
}