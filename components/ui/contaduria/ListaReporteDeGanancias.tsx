import React, { FC } from "react";
import { ReporteDeGanancia } from "../../../interfaces";
import { moneyFormat } from "../../../utils";

interface Props {
  reporteDeGanancia: ReporteDeGanancia;
}

const ListaReporteDeGanancias: FC<Props> = ({ reporteDeGanancia }) => {
  return (
    <>
      <tbody className="divide-y divide-gray-200 bg-white">
        <tr
          key={reporteDeGanancia._id}
          className="cursor-pointer hover:bg-yellow-100"
        >
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {reporteDeGanancia.mes}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {reporteDeGanancia.anio}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {reporteDeGanancia.ventasSucursalIndividual.map((listado) => (
                <div
                  key={listado.nombreSucursal}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  <div className="font-medium text-gray-900">{listado.nombreSucursal}</div>
                </div>
              ))}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {reporteDeGanancia.ventasSucursalIndividual.map((listado) => (
                <div
                  key={listado.nombreSucursal}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  <div className="font-medium text-gray-900">$ {moneyFormat(listado.ventasSucursal)}</div>
                </div>
              ))}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              $ {moneyFormat(reporteDeGanancia.totalVentas)}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              $ {moneyFormat(reporteDeGanancia.totalCompras)}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              $ {moneyFormat(reporteDeGanancia.balance)}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {reporteDeGanancia.balance >= 0
                ? "✅ Se vendio más de lo que se compro"
                : "❌ Se compro más de lo que se vendio"}
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default ListaReporteDeGanancias;
