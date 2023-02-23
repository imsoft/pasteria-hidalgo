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
            {reporteDeCompra.precioTotalDelCompra}
            {/* {reporteDeCompra.materiaPrima} */}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {/* {reporteDeCompra.unidades} */}
            {reporteDeCompra.credito}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.factura}
            {/* {reporteDeCompra.tempetatura} */}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {reporteDeCompra.fechaDeCompra}
            {/* {reporteDeCompra.cantidad} */}
          </div>
          {/* <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
              reporteDeCompra.cantidad > 100
                ? "text-green-800 bg-green-100"
                : reporteDeCompra.cantidad <= 100 &&
                  reporteDeCompra.cantidad >= 50
                ? "text-yellow-800 bg-yellow-100"
                : reporteDeCompra.cantidad < 50 && "text-red-800 bg-red-100"
            }`}
          >
            {reporteDeCompra.cantidad > 100
              ? "Suficiente"
              : reporteDeCompra.cantidad <= 100 &&
                reporteDeCompra.cantidad >= 50
              ? "Casi por terminar"
              : reporteDeCompra.cantidad < 50 && "Esta a punto de terminarse"}
          </span> */}
        </td>
      </tr>
    </tbody>
  );
};

export default ListaManejosDeAlmacen;
