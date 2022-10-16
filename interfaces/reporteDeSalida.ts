import { Unidades } from '.';

export interface ReporteDeSalida {
  _id: string;
  fecha: string;
  productoExtra: string;
  codigoDeProductoExtra: string;
  cantidadDeProductoExtra: string;
  unidadesDeProductoExtra: Unidades;
  codigoDeMasa: string;
  masa: string;
  cantidadDeMasa: string;
  unidadesDeMasa: Unidades;
  rellenos: string;
  codigosDeRelleno: string;
  cantidadDeProductoExtraRelleno: string;
  unidadesDeRelleno: Unidades;
  temperaturaDeRellenos: string;
  sucursalAEnviar: string;
  datosDeRepartidor: string;
  datosDeLaRuta: string;
  kilometrajeDeEntrada: string;
  kilometrajeDeSalida: string;
}
