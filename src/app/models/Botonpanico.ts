import { Usuarios } from "./Usuarios"
export class Botonpanico {
    id_Boton_Panico: number = 0;
    usuario:Usuarios = new Usuarios()
    fecha_Activacion: Date = new Date();
    lat: number = 0;
    lon: number = 0;
}