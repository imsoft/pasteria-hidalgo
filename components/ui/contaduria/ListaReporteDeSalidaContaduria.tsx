import { FC } from "react";
import { ReporteDeSalida } from "../../../interfaces";

interface Props {
  reporteDeSalida: ReporteDeSalida;
}

const ListaReportesDeSalidaContaduria: FC<Props> = ({ reporteDeSalida }) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={reporteDeSalida._id}
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

export default ListaReportesDeSalidaContaduria;
