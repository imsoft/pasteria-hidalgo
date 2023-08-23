import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";
import { ReportesVentasIndividualContext } from "../../../context/gerencia-de-ventas/reporteVentasIndividual";
import { dividirFecha, moneyFormat } from "../../../utils";
import { ReporteDeCompraContext } from "../../../context/gerencia-de-compras/reporteDeCompras";

interface GroupedDataItem {
  fecha: string;
  lugarDeVenta: string;
  nombreLugarDeVenta: string;
  totalDeLaVenta: number;
}

const mesesDelAno: string[] = [
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

const years: string[] = ["2022", "2023", "2024", "2025"];

export default function ReporteGanancias() {
  const [inputMes, setInputMes] = useState("");
  const [inputAnio, setInputAnio] = useState("");
  const [inputSucursalesYFranquicias, setInputSucursalesYFranquicias] =
    useState("");

  const [change, setChange] = useState(false);

  const { reportesDeCompras, refreshReportesDeCompras } = useContext(
    ReporteDeCompraContext
  );
  const reportesDeComprasMemo = useMemo(
    () => reportesDeCompras,
    [reportesDeCompras]
  );

  const { sucursalesYFranquicias, refreshSucursalesYFranquicias } = useContext(
    SucursalesYFranquiciasContext
  );
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const { reportesVentasIndividual, refreshReportesVentasIndividual } =
    useContext(ReportesVentasIndividualContext);
  const reportesVentasIndividualMemo = useMemo(
    () => reportesVentasIndividual,
    [reportesVentasIndividual]
  );

  const onTextFieldChangedMes = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputMes(event.target.value);
  };

  const onTextFieldChangedAnio = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputAnio(event.target.value);
  };

  const onTextFieldChangedSucursalesYFranquicias = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalesYFranquicias(event.target.value);
  };

  const mostrarTodos = () => {
    setChange(false);
    setInputMes("");
    setInputAnio("");
    setInputSucursalesYFranquicias("");
  };

  useEffect(() => {
    refreshSucursalesYFranquicias();
    refreshReportesDeCompras();
    refreshReportesVentasIndividual();
    setChange(false);

    const filteredData = groupedData.filter((item) => {
      const filterMes = inputMes
        ? dividirFecha(item.fecha)[1] === inputMes
        : true;
      const filterAnio = inputAnio
        ? dividirFecha(item.fecha)[2] === inputAnio
        : true;
      const filterSucursal = inputSucursalesYFranquicias
        ? item.nombreLugarDeVenta === inputSucursalesYFranquicias
        : true;

      return filterMes && filterAnio && filterSucursal;
    });
  }, []);

  const groupedData: GroupedDataItem[] = Object.values(
    reportesVentasIndividualMemo
      .filter((filtro) => filtro.lugarDeVenta === "Sucursal")
      .reduce((acc: { [key: string]: GroupedDataItem }, listado) => {
        const key = `${listado.fecha}-${listado.lugarDeVenta}-${listado.nombreLugarDeVenta}`;
        if (!acc[key]) {
          acc[key] = {
            fecha: listado.fecha,
            lugarDeVenta: listado.lugarDeVenta,
            nombreLugarDeVenta: listado.nombreLugarDeVenta,
            totalDeLaVenta: listado.totalDeLaVenta,
          };
        } else {
          acc[key].totalDeLaVenta += listado.totalDeLaVenta;
        }
        return acc;
      }, {})
  );

  const filteredData = groupedData.filter((item) => {
    const filterMes = inputMes
      ? dividirFecha(item.fecha)[1] === inputMes
      : true;
    const filterAnio = inputAnio
      ? dividirFecha(item.fecha)[2] === inputAnio
      : true;
    const filterSucursal = inputSucursalesYFranquicias
      ? item.nombreLugarDeVenta === inputSucursalesYFranquicias
      : true;

    return filterMes && filterAnio && filterSucursal;
  });

  const tableRows = filteredData.map((listado) => (
    <tbody
      className="divide-y divide-gray-200 bg-white"
      key={listado.fecha + listado.nombreLugarDeVenta}
    >
      <tr className="cursor-pointer hover:bg-yellow-100">
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {dividirFecha(listado.fecha)[1]}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {dividirFecha(listado.fecha)[2]}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {listado.lugarDeVenta}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {listado.nombreLugarDeVenta}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            $ {moneyFormat(listado.totalDeLaVenta)}
          </div>
        </td>
      </tr>
    </tbody>
  ));

  const groupedCompras: Record<string, number> = reportesDeComprasMemo.reduce(
    (acc: { [key: string]: number }, item) => {
      const fecha = `${dividirFecha(item.fechaDeCompra)[1]}-${
        dividirFecha(item.fechaDeCompra)[2]
      }`;

      if (!acc[fecha]) {
        acc[fecha] = item.precioTotalDelCompra;
      } else {
        acc[fecha] += item.precioTotalDelCompra;
      }

      return acc;
    },
    {}
  );

  const filteredCompras = reportesDeComprasMemo.filter((item) => {
    const mes = dividirFecha(item.fechaDeCompra)[1];
    const anio = dividirFecha(item.fechaDeCompra)[2];
    return (
      (!inputMes || mes === inputMes) && (!inputAnio || anio === inputAnio)
    );
  });

  const comprasRows = Object.keys(groupedCompras).map((fecha) => {
    const mes = fecha.split("-")[0];
    const anio = fecha.split("-")[1];

    if ((inputMes && mes !== inputMes) || (inputAnio && anio !== inputAnio)) {
      return null;
    }

    return (
      <tbody className="divide-y divide-gray-200 bg-white" key={fecha}>
        <tr className="cursor-pointer hover:bg-yellow-100">
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">{mes}</div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">{anio}</div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              $ {moneyFormat(groupedCompras[fecha])}
            </div>
          </td>
        </tr>
      </tbody>
    );
  });

  const totalVentas = filteredData.reduce(
    (total, item) => total + item.totalDeLaVenta,
    0
  );

  const totalCompras = filteredCompras.reduce(
    (total, item) => total + item.precioTotalDelCompra,
    0
  );

  const balance = totalVentas - totalCompras;

  const estado = totalVentas >= totalCompras ? "✅ Se vendio más de los que se compro" : "❌ Se compro más de lo que se vendio";

  return (
    <SidebarLayoutContaduria>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Reporte de ganancias
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver los reportes de ganancia para la empresa.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-1">
                <label
                  htmlFor="CmbMes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mes
                </label>
                <select
                  id="CmbMes"
                  name="CmbMes"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={inputMes}
                  onChange={onTextFieldChangedMes}
                >
                  <option hidden>Seleccione una opción...</option>
                  {mesesDelAno.map((mes) => (
                    <option key={mes}>{mes}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-3 sm:col-span-1">
                <label
                  htmlFor="CmdAnio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Año
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <select
                    id="CmdAnio"
                    name="CmdAnio"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                    value={inputAnio}
                    onChange={onTextFieldChangedAnio}
                  >
                    <option hidden>Seleccione una opción...</option>
                    {years.map((year) => (
                      <option key={year}>{year.toString()}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-3 sm:col-span-1">
                <label
                  htmlFor="CmdSucursal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sucursal
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <select
                    id="CmdSucursal"
                    name="CmdSucursal"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                    value={inputSucursalesYFranquicias}
                    onChange={onTextFieldChangedSucursalesYFranquicias}
                  >
                    <option hidden>Seleccione una Sucursal...</option>
                    {sucursalesYFranquiciasMemo
                      .filter(
                        (sucursalesYFranquicias) =>
                          sucursalesYFranquicias.sucursalOFranquicia ===
                          "Sucursal"
                      )
                      .map((sucursalesYFranquicias) => (
                        <option
                          key={sucursalesYFranquicias.nombreSucursalOFranquicia}
                        >
                          {sucursalesYFranquicias.nombreSucursalOFranquicia}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="py-3 bg-white text-left">
                <button
                  type="submit"
                  className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                  onClick={mostrarTodos}
                >
                  Mostrar todos
                </button>
              </div>
            </div>
          </div>

          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="sm:flex sm:items-center mb-5">
                <div className="sm:flex-auto">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Ventas de todas las sucursales
                  </h2>
                  <p className="mt-2 text-sm text-gray-700">
                    Aquí podras ver los reportes de ganancia para la empresa.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Mes
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Año
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
                        Total De La Venta
                      </th>
                    </tr>
                  </thead>

                  {tableRows}
                </table>
              </div>
            </div>
          </div>

          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="sm:flex sm:items-center my-5">
                <div className="sm:flex-auto">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Compras de todas las sucursales
                  </h2>
                  <p className="mt-2 text-sm text-gray-700">
                    Aquí podras ver los reportes de ganancia para la empresa.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Mes
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Año
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Precio Total De La Compra
                      </th>
                    </tr>
                  </thead>

                  {comprasRows}
                </table>
              </div>
            </div>
          </div>

          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="sm:flex sm:items-center my-5">
                <div className="sm:flex-auto">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Ganancias
                  </h2>
                  <p className="mt-2 text-sm text-gray-700">
                    Aquí podras ver los reportes de ganancia para la empresa.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total de ventas
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total de compras
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Balance
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Estado
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    <tr>
                      <td className="py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6">
                        $ {moneyFormat(totalVentas)}
                      </td>
                      <td className="py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6">
                        $ {moneyFormat(totalCompras)}
                      </td>
                      <td className="py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6">
                        $ {moneyFormat(balance)}
                      </td>
                      <td className="py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6">
                        {estado}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayoutContaduria>
  );
}
