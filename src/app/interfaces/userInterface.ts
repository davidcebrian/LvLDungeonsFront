import { logging } from "protractor";
import { LoginComponent } from "../components/login/login.component";

/**Interfaz usada para recoger o enviar los datos de usuarios */
export interface User {
  idUsuario?: number;
	nombre: String;
	email: String;
	username: String;
	password: String;
	fechaCreacion?: String;
	edad: number;
	personaje?: String;
}

export interface Personaje {
	vida?: number;
	daño?: number;
	energia?: number;
	vivo?: boolean;
  id?: number;
  username?: string;
	empezarPartida?: Boolean;
}

export interface PersonajePartida{
	listo?: boolean;
	token?: String;
}

export interface Partida {
	token: String;
	personajes: Personaje[];
	iniciada: boolean;
	idOwner: number;
}
