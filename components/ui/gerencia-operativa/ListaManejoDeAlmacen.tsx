import { FC } from "react";
import router from "next/router";
import { ReporteDeCompra } from "../../../interfaces";

interface Props {
  reporteDeCompra: ReporteDeCompra;
}

const ListaManejosDeAlmacen: FC<Props> = ({ reporteDeCompra }) => {
  const onClick = () => {
    router.push(`/gerencia-operativa/manejoDeAlmacen/${reporteDeCompra._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={reporteDeCompra._id}
        onClick={onClick}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.listadoDeReporteDeCompra.map((lrc, index) => {
              if (index === 0) {
                // Verificar si es el primer valor del arreglo
                return lrc.materiaPrima; // Retornar el valor de materiaPrima
              }
              return null; // Retornar null para los demás elementos
            })}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.listadoDeReporteDeCompra.map((lrc, index) => {
              if (index === 0) {
                // Verificar si es el primer valor del arreglo
                return lrc.unidades; // Retornar el valor de materiaPrima
              }
              return null; // Retornar null para los demás elementos
            })}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.listadoDeReporteDeCompra.map((lrc, index) => {
              if (index === 0) {
                // Verificar si es el primer valor del arreglo
                return lrc.tempetatura; // Retornar el valor de materiaPrima
              }
              return null; // Retornar null para los demás elementos
            })}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.listadoDeReporteDeCompra.map((lrc, index) => {
              if (index === 0) {
                // Verificar si es el primer valor del arreglo
                return lrc.cantidad; // Retornar el valor de materiaPrima
              }
              return null; // Retornar null para los demás elementos
            })}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaManejosDeAlmacen;
