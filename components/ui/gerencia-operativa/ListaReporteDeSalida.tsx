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
            {reporteDeSalida.sucursalAEnviar}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.nombreDelRepartidor}
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

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.listadoReporteDeSalida.map((listado) => (
              <div
                key={listado.uuid}
                className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
              >
                <div className="font-medium text-gray-900">
                  <strong>Fecha:</strong> {listado.fecha}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Tipo de producto:</strong> {listado.tipoDeProducto}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Producto:</strong> {listado.producto}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Código del producto:</strong>{" "}
                  {listado.codigoDelProducto}
                </div>
                <div className="font-medium text-gray-900">
                  <strong>Cantidad:</strong> {listado.cantidadDeProducto}
                </div>
              </div>
            ))}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaReportesDeSalida;
