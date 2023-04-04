import React, { FC, useContext, useMemo } from "react";
import { ReportesVentasAmbulantesIndividualContext } from "../../../context/gerencia-de-ventas/reporteVentasAmbulantesIndividual";
import { ReportesVentasIndividualContext } from "../../../context/gerencia-de-ventas/reporteVentasIndividual";
import { AsignarComision } from "../../../interfaces";
import router from "next/router";

interface Props {
  asignarComision: AsignarComision;
}

const ListaAsignarComision: FC<Props> = ({ asignarComision }) => {
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

  const totalVentasIndividual = reportesVentasIndividualMemo
    .filter(
      (reporteVentasIndividual) =>
        reporteVentasIndividual.nombreLugarDeVenta ===
        asignarComision.nombreSucursalOFranquicia
    )
    .reduce(
      (total, reporteVentasIndividual) =>
        total + reporteVentasIndividual.totalDeLaVenta,
      0
    );

  const totalVentasAmbulantes = reportesVentasAmbulantesIndividualMemo
    .filter(
      (reporteVentasIndividual) =>
        reporteVentasIndividual.fecha ===
        asignarComision.nombreSucursalOFranquicia
    )
    .reduce(
      (total, reporteVentasIndividual) =>
        total + reporteVentasIndividual.totalDeLaVenta,
      0
    );

  const onClick = () => {
    router.push(`/contaduria/asignarComisiones/${asignarComision._id}`);
  };

  return (
    <>
      <tbody className="divide-y divide-gray-200 bg-white">
        <tr
          key={asignarComision._id}
          onClick={onClick}
          className="cursor-pointer hover:bg-yellow-100"
        >
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {asignarComision.sucursalOFranquicia}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {asignarComision.nombreSucursalOFranquicia || "-"}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {asignarComision.mes}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {asignarComision.anio}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              $ {asignarComision.minimoDeLaMeta}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              $ {totalVentasIndividual}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {totalVentasIndividual >= asignarComision.minimoDeLaMeta
                ? "✅ Lo logro"
                : "❌ No lo logro"}
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default ListaAsignarComision;
