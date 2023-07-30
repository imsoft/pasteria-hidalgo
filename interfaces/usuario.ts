export interface Usuario {
  _id: string;
  nombre: string;
  correoElectronico: string;
  contrasenia: string;
  role: string[];
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;

  createdAt?: Date;
  updatedAt?: Date;
}
