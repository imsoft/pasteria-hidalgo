import { ListadoDeProductos, Unidades } from '.';

export interface ReporteDeSalida {
  _id: string;
  fecha: string;
  productoExtra: string;
  codigoDeProductoExtra: string;
  cantidadDeProductoExtra: string;
  unidadesDeProductoExtra: Unidades;
  listadoDeProductos: ListadoDeProductos[];
  sucursalAEnviar: string;
  datosDeRepartidor: string;
  datosDeLaRuta: string;
  kilometrajeDeEntrada: string;
  kilometrajeDeSalida: string;
}
