export interface CheckInPersonal {
  _id: string;
  sucursalOFranquicia: string;
  nombre: string;
  fecha: string;
  horaDeIngreso: string;
  horaDeSalida: string;
  sucursales?: string;
  franquicias?: string;
}
