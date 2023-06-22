export interface Usuario {
  _id: string;
  nombre: string;
  correoElectronico: string;
  contrasenia: string;
  role: string[];

  createdAt?: Date;
  updatedAt?: Date;
}
