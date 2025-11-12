import { Rol } from "./Rol"

export class Usuarios {
    ID_Usuario:number = 0
    Nombreusuario:string = ""
    NombreCompleto:string = ""
    Email:string = ""
    Contrasenahash:string = ""
    Fecha_Registro:string = ""
    Telefono:string = ""
    Telefono_panico:string = ""
    Mensaje:string = ""
    rol:Rol = new Rol()
}