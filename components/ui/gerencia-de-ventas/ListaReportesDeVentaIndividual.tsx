import { FC } from "react";
import { ReporteVentasIndividual } from "../../../interfaces";

interface Props {
  reporteVentasIndividual: ReporteVentasIndividual;
}

const ListaReportesVentasIndividual: FC<Props> = ({
  reporteVentasIndividual,
}) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={reporteVentasIndividual._id}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteVentasIndividual.fecha}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">
            {reporteVentasIndividual.nombreDelVendedor}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteVentasIndividual.lugarDeVenta}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteVentasIndividual.nombreLugarDeVenta}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteVentasIndividual.listadoDeProductos.map((listado) => (
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
            ${reporteVentasIndividual.totalDeLaVenta}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteVentasIndividual.promocionUsada}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteVentasIndividual.metodoDePago}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteVentasIndividual.correoElectronicoClienteFrecuente}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteVentasIndividual.puntosClienteFrecuente}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaReportesVentasIndividual;
