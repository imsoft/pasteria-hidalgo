import { ChangeEvent, useContext, useMemo, useState, useEffect } from "react";
import Link from "next/link";

import { ReportesVentasIndividualContext } from "../../../context/gerencia-de-ventas/reporteVentasIndividual/ReportesVentasIndividualContext";
import ListaReportesVentasIndividual from "../../../components/ui/gerencia-de-ventas/ListaReportesDeVentaIndividual";

import { SidebarLayoutGerenciaVentas } from "../../../components/layouts/gerencia-de-ventas/SidebarLayoutGerenciaVentas";
import { LugarDeVenta } from "../../../interfaces";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";
import { AuthContext } from "../../../context/auth";
import { cambiarFormatoFecha } from "../../../utils";
import { moneyFormat } from "../../../utils/moneyFormat";

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

const validSalesPlace: LugarDeVenta[] = ["Evento", "Franquicia", "Sucursal"];

const VerReporteDeVentasIndividual = () => {
  const { user } = useContext(AuthContext);
  const [inputFecha, setInputFecha] = useState(
    formattedDate
  );
  const [inputNuevaFecha, setInputNuevaFecha] = useState(
    cambiarFormatoFecha(inputFecha)
  );
  const [change, setChange] = useState(false);

  const [inputLugarDeLaVenta, setInputLugarDeLaVenta] = useState(
    user?.sucursalOFranquicia
  );
  const [inputNombreSucursalOFranquicia, setInputNombreSucursalOFranquicia] =
    useState(user?.nombreSucursalOFranquicia);

  const [sumaTotalVentasDiaria, setSumaTotalVentasDiaria] = useState(0);
  const [sumaVentasEfectivo, setSumaVentasEfectivo] = useState(0);
  const [sumaVentasTarjeta, setSumaVentasTarjeta] = useState(0);

  const { reportesVentasIndividual, refreshReportesVentasIndividual } =
    useContext(ReportesVentasIndividualContext);
  const reportesVentasIndividualMemo = useMemo(
    () => reportesVentasIndividual,
    [reportesVentasIndividual]
  );

  const { sucursalesYFranquicias, refreshSucursalesYFranquicias } = useContext(
    SucursalesYFranquiciasContext
  );
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const onTextFieldChangedFecha = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFecha(event.target.value);
    const nuevaFecha = event.target.value.split("-", 3);
    const dia = nuevaFecha[2];
    const mes = nuevaFecha[1];
    const anio = nuevaFecha[0];
    setInputNuevaFecha(`${dia}/${mes}/${anio}`);
    setChange(true);
  };

  const onTextFieldChangedLugarDeLaVenta = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputLugarDeLaVenta(event.target.value as LugarDeVenta);
  };

  const onTextFieldChangedNombreSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombreSucursalOFranquicia(event.target.value);
  };

  const mostrarTodos = () => {
    setChange(false);
    setInputLugarDeLaVenta("");
    setInputNombreSucursalOFranquicia("");
    setInputFecha(hoy.toLocaleDateString());
    setInputNuevaFecha(hoy.toLocaleDateString());
    // router.reload();
  };

  useEffect(() => {
    refreshReportesVentasIndividual();
    refreshSucursalesYFranquicias();
  }, []);

  useEffect(() => {
    console.log(inputFecha);
  }
  , [inputFecha, inputNuevaFecha, inputLugarDeLaVenta, inputNombreSucursalOFranquicia]);

  useEffect(() => {
    reportesVentasIndividualMemo
      .filter(
        (reporteVentasIndividual) =>
          reporteVentasIndividual.fecha === inputNuevaFecha
      )
      .filter(
        (reporteVentasIndividual) =>
          reporteVentasIndividual.lugarDeVenta === inputLugarDeLaVenta
      )
      .filter(
        (reporteVentasIndividual) =>
          reporteVentasIndividual.nombreLugarDeVenta ===
          inputNombreSucursalOFranquicia
      )
      .map((reporteVentasIndividual) => (
        <ListaReportesVentasIndividual
          key={reporteVentasIndividual._id}
          reporteVentasIndividual={reporteVentasIndividual}
        />
      ));

    const ventasFiltradas = reportesVentasIndividualMemo.filter(
      (reporteVentasIndividual) =>
        reporteVentasIndividual.fecha === inputNuevaFecha &&
        reporteVentasIndividual.lugarDeVenta === inputLugarDeLaVenta &&
        reporteVentasIndividual.nombreLugarDeVenta ===
          inputNombreSucursalOFranquicia
    );

    const sumaTotalVentasDiaria = ventasFiltradas.reduce(
      (acumulador, venta) => acumulador + venta.totalDeLaVenta,
      0
    );

    setSumaTotalVentasDiaria(sumaTotalVentasDiaria);

    const ventasEfectivo = ventasFiltradas.filter(
      (venta) => venta.metodoDePago === "Efectivo"
    );
    const sumaVentasEfectivo = ventasEfectivo.reduce(
      (acumulador, venta) => acumulador + venta.totalDeLaVenta,
      0
    );
    setSumaVentasEfectivo(sumaVentasEfectivo);

    const ventasTarjeta = ventasFiltradas.filter(
      (venta) => venta.metodoDePago === "Tarjeta bancaria"
    );
    const sumaVentasTarjeta = ventasTarjeta.reduce(
      (acumulador, venta) => acumulador + venta.totalDeLaVenta,
      0
    );
    setSumaVentasTarjeta(sumaVentasTarjeta);
  }, [inputFecha, inputLugarDeLaVenta, inputNombreSucursalOFranquicia]);

  return (
    <SidebarLayoutGerenciaVentas>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Reporte de ventas individual
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver los Reporte de ventas individual para la empresa.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-yellow px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-primary-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:ring-offset-2 sm:w-auto"
            >
              <Link
                href={
                  "/gerencia-de-ventas/reporteDeVentasIndividual/AgregarReporteDeVentasIndividual"
                }
              >
                Agregar Reporte de ventas individual
              </Link>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-6 mt-6">
          <div className="col-span-6 sm:col-span-2">
            <label
              htmlFor="TxtFecha"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha
            </label>
            <input
              type="date"
              name="TxtFecha"
              id="TxtFecha"
              autoComplete="off"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
              value={inputFecha}
              onChange={onTextFieldChangedFecha}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label
              htmlFor="TxtEspecificacionDeLugarDeVenta"
              className="block text-sm font-medium text-gray-700"
            >
              Especificación de lugar de venta
            </label>
            <select
              id="TxtEspecificacionDeLugarDeVenta"
              name="TxtEspecificacionDeLugarDeVenta"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
              value={inputLugarDeLaVenta}
              onChange={onTextFieldChangedLugarDeLaVenta}
            >
              {user?.role.includes("admin") ? (
                <>
                  <option hidden>Selecciona un lugar de venta...</option>
                  {validSalesPlace.map((salesPlace) => (
                    <option key={salesPlace}>{salesPlace}</option>
                  ))}
                </>
              ) : (
                <>
                  <option>{inputLugarDeLaVenta}</option>
                </>
              )}
            </select>
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label
              htmlFor="CmbFranquicia"
              className="block text-sm font-medium text-gray-700"
            >
              {inputLugarDeLaVenta === "Sucursal"
                ? "Sucursal"
                : inputLugarDeLaVenta === "Franquicia"
                ? "Franquicia"
                : "Primero seleccione franquicia, sucursal o evento"}
            </label>
            <select
              id="CmbFranquicia"
              name="CmbFranquicia"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
              value={inputNombreSucursalOFranquicia}
              onChange={onTextFieldChangedNombreSucursalOFranquicia}
            >
              {user?.role.includes("admin") ? (
                <>
                  <option hidden>
                    Seleccione la{" "}
                    {inputLugarDeLaVenta === "Sucursal"
                      ? "Sucursal"
                      : inputLugarDeLaVenta === "Franquicia"
                      ? "Franquicia"
                      : inputLugarDeLaVenta === "Evento"
                      ? ""
                      : "Primero seleccione franquicia, sucursal o evento"}
                    ...
                  </option>
                  {sucursalesYFranquiciasMemo
                    .filter(
                      (sucursalesYFranquicias) =>
                        sucursalesYFranquicias.sucursalOFranquicia ===
                        inputLugarDeLaVenta
                    )
                    .map((sucursalesYFranquicias) => (
                      <option
                        key={sucursalesYFranquicias.nombreSucursalOFranquicia}
                      >
                        {sucursalesYFranquicias.nombreSucursalOFranquicia}
                      </option>
                    ))}
                </>
              ) : (
                <>
                  <option>{inputNombreSucursalOFranquicia}</option>
                </>
              )}
            </select>
          </div>

          {user?.role.includes("admin") && (
            <div className="bg-white">
              <button
                type="submit"
                className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                onClick={mostrarTodos}
              >
                Mostrar todos
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Nombre Del Vendedor
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Lugar De Venta
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Nombre Lugar De Venta
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Listado De Productos
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total De La Venta
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Promoción Usada
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Metodo De Pago
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Correo Electrónico Cliente Frecuente
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Puntos usados Cliente Frecuente
                      </th>
                    </tr>
                  </thead>

                  {!change && user?.role.includes("admin")
                    ? reportesVentasIndividualMemo.map(
                        (reporteVentasIndividual) => (
                          <ListaReportesVentasIndividual
                            key={reporteVentasIndividual._id}
                            reporteVentasIndividual={reporteVentasIndividual}
                          />
                        )
                      )
                    : reportesVentasIndividualMemo
                        .filter(
                          (reporteVentasIndividual) =>
                            reporteVentasIndividual.fecha === inputNuevaFecha
                        )
                        .filter(
                          (reporteVentasIndividual) =>
                            reporteVentasIndividual.lugarDeVenta ===
                            inputLugarDeLaVenta
                        )
                        .filter(
                          (reporteVentasIndividual) =>
                            reporteVentasIndividual.nombreLugarDeVenta ===
                            inputNombreSucursalOFranquicia
                        )
                        .map((reporteVentasIndividual) => (
                          <ListaReportesVentasIndividual
                            key={reporteVentasIndividual._id}
                            reporteVentasIndividual={reporteVentasIndividual}
                          />
                        ))}
                </table>
              </div>
            </div>
          </div>
        </div>
        {change && (
          <>
            <p className="text-xl font-semibold mt-10 text-right text-gray-900">
              Ventas en Efectivo: ${moneyFormat(sumaVentasEfectivo)}
            </p>
            <p className="text-xl font-semibold mt-2 text-right text-gray-900">
              Ventas con Tarjeta Bancaria: ${moneyFormat(sumaVentasTarjeta)}
            </p>
            <h2 className="text-2xl font-semibold mt-2 text-right text-gray-900">
              Total de ventas: ${moneyFormat(sumaTotalVentasDiaria)}
            </h2>
          </>
        )}
      </div>
    </SidebarLayoutGerenciaVentas>
  );
};

export default VerReporteDeVentasIndividual;
