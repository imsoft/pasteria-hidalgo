import { ListadoDeProductos } from ".";

export interface ReporteVentasAmbulantesIndividual {
  _id: string;
  fecha: string;
  nombreDelVendedor: string;
  totalDeLaVenta: number;
  listadoDeProductos: ListadoDeProductos[];
}
