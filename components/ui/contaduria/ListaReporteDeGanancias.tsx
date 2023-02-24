import React, { FC, useContext, useMemo } from "react";
import { ReporteDeCompraContext } from "../../../context/gerencia-de-compras/reporteDeCompras";
import { ReportesVentasAmbulantesIndividualContext } from "../../../context/gerencia-de-ventas/reporteVentasAmbulantesIndividual";
import { ReportesVentasIndividualContext } from "../../../context/gerencia-de-ventas/reporteVentasIndividual";
import { AsignarComision } from "../../../interfaces";

interface Props {
  asignarComision: AsignarComision;
}

const ListaReporteDeGanancias: FC<Props> = ({ asignarComision }) => {
  const { reportesVentasIndividual } = useContext(
    ReportesVentasIndividualContext
  );
  const reportesVentasIndividualMemo = useMemo(
    () => reportesVentasIndividual,
    [reportesVentasIndividual]
  );

  const { reportesVentasAmbulantesIndividual } = useContext(
    ReportesVentasAmbulantesIndividualContext
  );
  const reportesVentasAmbulantesIndividualMemo = useMemo(
    () => reportesVentasAmbulantesIndividual,
    [reportesVentasAmbulantesIndividual]
  );

  const { reportesDeCompras } = useContext(ReporteDeCompraContext);
  const reportesDeComprasMemo = useMemo(
    () => reportesDeCompras,
    [reportesDeCompras]
  );

  const totalVentasIndividual = reportesVentasIndividualMemo
    .filter(
      (reporteVentasIndividual) =>
        reporteVentasIndividual.nombreLugarDeVenta ===
        asignarComision.sucursales
    )
    .reduce(
      (total, reporteVentasIndividual) =>
        total + reporteVentasIndividual.totalDeLaVenta,
      0
    );

  const totalDeCompras = reportesDeComprasMemo.reduce(
    (total, reportesDeCompras) =>
      total + reportesDeCompras.precioTotalDelCompra,
    0
  );

  let diferencia = totalVentasIndividual - totalDeCompras;

  const obtenerNombreMes = (mes: number): string => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return meses[mes];
  };

  let partesFecha: string[] = reportesDeComprasMemo.map((reporteDeCompras) => {
    const fecha = new Date(reporteDeCompras.fechaDeCompra);
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();
    const mesTexto = obtenerNombreMes(mes);
    return `${mesTexto} ${anio}`;
  });

  return (
    <>
      <tbody className="divide-y divide-gray-200 bg-white">
        <tr
          key={asignarComision._id}
          className="cursor-pointer hover:bg-yellow-100"
        >
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {asignarComision.sucursalOFranquicia}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {asignarComision.franquicias || "-"}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {asignarComision.sucursales || "-"}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                {partesFecha.map((mes) => (
                  <div
                    key={mes + Math.floor(Math.random() * 100)}
                    className="font-medium text-gray-900 py-4"
                  >
                    {mes}
                  </div>
                ))}
              </div>
              <div className="col-span-2 sm:col-span-1">
                {reportesDeComprasMemo.map((reporteDeCompras) => (
                  <div
                    key={reporteDeCompras._id}
                    className="font-medium text-gray-900 py-4"
                  >
                    $ {reporteDeCompras.precioTotalDelCompra}
                  </div>
                ))}
              </div>
            </div> */}

            <div className="font-medium text-gray-900">$ {totalDeCompras}</div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              $ {totalVentasIndividual}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">$ {diferencia}</div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {diferencia >= 0
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
