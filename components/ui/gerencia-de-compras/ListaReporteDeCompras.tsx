import { FC } from "react";
import { ReporteDeCompra } from "../../../interfaces";

interface Props {
  reporteDeCompra: ReporteDeCompra;
}

const ListaReportesDeCompras: FC<Props> = ({ reporteDeCompra }) => {
  // const onClick = () => {
  //   router.push(`/gerencia-de-compras/reporteDeCompras/${reporteDeCompra._id}`);
  // };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={reporteDeCompra._id}
        // onClick={onClick}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.fechaDeCompra}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.credito}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.nombreProveedor}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.factura}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.listadoDeReporteDeCompra.map((listado) => (
              <div
                key={listado.uuid}
                className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
              >
                <div className="font-medium text-gray-900">
                <strong>Materia Prima:</strong> {listado.materiaPrima}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Unidades:</strong> {listado.unidades}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Temperatura:</strong> {listado.tempetatura}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Caducidad:</strong> {listado.caducidad}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Cantidad:</strong> {listado.cantidad}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Precio por unidad:</strong> {listado.precioPorUnidad}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Precio total del producto:</strong> {listado.precioTotalDelProducto}
                </div>
              </div>
            ))}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.precioTotalDelCompra}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaReportesDeCompras;
