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
