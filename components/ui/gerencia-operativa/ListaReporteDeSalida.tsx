import { FC } from "react";
import router from "next/router";
import { ReporteDeSalida } from "../../../interfaces";

interface Props {
  reporteDeSalida: ReporteDeSalida;
}

const ListaReportesDeSalida: FC<Props> = ({ reporteDeSalida }) => {
  const onClick = () => {
    router.push(`/gerencia-operativa/reporteDeSalida/${reporteDeSalida._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={reporteDeSalida._id}
        onClick={onClick}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.fecha}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.productoExtra}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.codigoDeProductoExtra}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.cantidadDeProductoExtra}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.unidadesDeProductoExtra}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.listadoDeProductos.map((listado) => (
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
            {reporteDeSalida.sucursalAEnviar}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.datosDeRepartidor}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.datosDeLaRuta}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.kilometrajeDeEntrada}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.kilometrajeDeSalida}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaReportesDeSalida;
