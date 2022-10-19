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
            {reporteDeSalida.codigoDeMasa}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.masa}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.cantidadDeMasa}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.unidadesDeMasa}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.rellenos}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.codigosDeRelleno}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.cantidadDeProductoExtraRelleno}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.unidadesDeRelleno}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeSalida.temperaturaDeRellenos}
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
