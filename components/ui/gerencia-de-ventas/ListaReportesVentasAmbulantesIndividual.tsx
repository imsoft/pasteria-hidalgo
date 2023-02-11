import { FC } from "react";
import { ReporteVentasAmbulantesIndividual } from "../../../interfaces";

interface Props {
    reporteVentasAmbulantesIndividual: ReporteVentasAmbulantesIndividual;
}

const ListaReportesVentasAmbulantesIndividual: FC<Props> = ({
    reporteVentasAmbulantesIndividual,
}) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={reporteVentasAmbulantesIndividual._id}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteVentasAmbulantesIndividual.fecha}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">
            {reporteVentasAmbulantesIndividual.nombreDelVendedor}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteVentasAmbulantesIndividual.listadoDeProductos.map((listado) => (
              <div
                key={listado.idProducto}
                className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
              >
                <div className="font-medium text-gray-900">
                  <strong>idProducto:</strong> {listado.idProducto}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Tipo de producto:</strong> {listado.tipoDeProducto}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Sabor del producto:</strong> {listado.saborProducto}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Precio:</strong> ${listado.precioProducto}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Cantidad:</strong> {listado.cantidad}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Monto:</strong> ${listado.monto}
                </div>
              </div>
            ))}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            ${reporteVentasAmbulantesIndividual.totalDeLaVenta}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaReportesVentasAmbulantesIndividual;
