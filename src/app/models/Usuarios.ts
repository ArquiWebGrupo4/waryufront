import { Rol } from "./Rol"

export class Usuarios {
    id_Usuario:number = 0
    nombreUsuario:string = ""
    nombreCompleto:string = ""
    email:string = ""
    contrasenahash:string = ""
    fecha_Registro:string = ""
    telefono:string = ""
    telefono_Panico:string = ""
    mensaje:string = ""
    rol:Rol = new Rol()
}