import { ListadoDeProductos } from ".";

export interface ReporteVentasAmbulantesIndividual {
  _id: string;
  fecha: string;
  nombreDelVendedor: string;
  nombreLugarDeVenta: string;
  totalDeLaVenta: number;
  listadoDeProductos: ListadoDeProductos[];
  correoElectronicoClienteFrecuente: string;
  puntosClienteFrecuente: number;
}
