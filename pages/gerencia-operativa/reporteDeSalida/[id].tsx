import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { ReportesDeSalidaContext } from "../../../context/gerencia-operativa/reporteDeSalida/ReportesDeSalidaContext";
import { ReporteDeSalida } from "../../../interfaces/reporteDeSalida";
import { Unidades } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";
import { dbReporteDeSalida } from "../../../database";

const validUnits: Unidades[] = ["Gramos", "Kilogramos", "Mililitros", "Litros"];

interface Props {
  reporteDeSalida: ReporteDeSalida;
}

export const ReporteDeSalidaPage: FC<Props> = ({ reporteDeSalida }) => {
  const router = useRouter();

  const { actualizarReporteDeSalida, eliminarReporteDeSalida } = useContext(
    ReportesDeSalidaContext
  );

  const [inputFecha, setInputFecha] = useState(reporteDeSalida.fecha);
  const [inputProductoExtra, setInputProductoExtra] = useState(
    reporteDeSalida.productoExtra
  );
  const [inputCodigoDeProductoExtra, setInputCodigoDeProductoExtra] = useState(
    reporteDeSalida.codigoDeProductoExtra
  );
  const [inputCantidadDeProductoExtra, setInputCantidadDeProductoExtra] =
    useState(reporteDeSalida.cantidadDeProductoExtra);
  const [inputUnidadesDeProductoExtra, setInputUnidadesDeProductoExtra] =
    useState(reporteDeSalida.unidadesDeProductoExtra);
  const [inputCodigoDeMasa, setInputCodigoDeMasa] = useState(
    reporteDeSalida.codigoDeMasa
  );
  const [inputMasa, setInputMasa] = useState(reporteDeSalida.masa);
  const [inputCantidadDeMasa, setInputCantidadDeMasa] = useState(
    reporteDeSalida.cantidadDeMasa
  );
  const [inputUnidadesDeMasa, setInputUnidadesDeMasa] = useState(
    reporteDeSalida.unidadesDeMasa
  );
  const [inputRellenos, setInputRellenos] = useState(reporteDeSalida.rellenos);
  const [inputCodigosDeRelleno, setInputCodigosDeRelleno] = useState(
    reporteDeSalida.codigosDeRelleno
  );
  const [
    inputCantidadDeProductoExtraRelleno,
    setInputCantidadDeProductoExtraRelleno,
  ] = useState(reporteDeSalida.cantidadDeProductoExtraRelleno);
  const [inputUnidadesDeRelleno, setInputUnidadesDeRelleno] = useState(
    reporteDeSalida.unidadesDeRelleno
  );
  const [inputTemperaturaDeRellenos, setInputTemperaturaDeRellenos] = useState(
    reporteDeSalida.temperaturaDeRellenos
  );
  const [inputSucursalAEnviar, setInputSucursalAEnviar] = useState(
    reporteDeSalida.sucursalAEnviar
  );
  const [inputDatosDeRepartidor, setInputDatosDeRepartidor] = useState(
    reporteDeSalida.datosDeRepartidor
  );
  const [inputDatosDeLaRuta, setInputDatosDeLaRuta] = useState(
    reporteDeSalida.datosDeLaRuta
  );
  const [
    inputKilometrajeDeEntradaYSalida,
    setInputKilometrajeDeEntradaYSalida,
  ] = useState(reporteDeSalida.kilometrajeDeEntradaYSalida);

  const MySwal = withReactContent(Swal);

  const onInputValueChangedFecha = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFecha(event.target.value);
  };

  const onInputValueChangedProductoExtra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputProductoExtra(event.target.value);
  };

  const onInputValueChangedCodigoDeProductoExtra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCodigoDeProductoExtra(event.target.value);
  };

  const onInputValueChangedCantidadDeProductoExtra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCantidadDeProductoExtra(event.target.value);
  };

  const onInputValueChangedUnidadesDeProductoExtra = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputUnidadesDeProductoExtra(event.target.value as Unidades);
  };

  const onInputValueChangedCodigoDeMasa = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCodigoDeMasa(event.target.value);
  };

  const onInputValueChangedMasa = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMasa(event.target.value);
  };

  const onInputValueChangedCantidadDeMasa = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCantidadDeMasa(event.target.value);
  };

  const onInputValueChangedUnidadesDeMasa = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputUnidadesDeMasa(event.target.value as Unidades);
  };

  const onInputValueChangedRellenos = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputRellenos(event.target.value);
  };

  const onInputValueChangedCodigosDeRelleno = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCodigosDeRelleno(event.target.value);
  };

  const onInputValueChangedCantidadDeProductoExtraRelleno = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCantidadDeProductoExtraRelleno(event.target.value);
  };

  const onInputValueChangedUnidadesDeRelleno = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputUnidadesDeRelleno(event.target.value as Unidades);
  };

  const onInputValueChangedTemperaturaDeRellenos = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputTemperaturaDeRellenos(event.target.value);
  };

  const onInputValueChangedSucursalAEnviar = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputSucursalAEnviar(event.target.value);
  };

  const onInputValueChangedDatosDeRepartidor = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDatosDeRepartidor(event.target.value);
  };

  const onInputValueChangedDatosDeLaRuta = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDatosDeLaRuta(event.target.value);
  };

  const onInputValueChangedKilometrajeDeEntradaYSalida = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputKilometrajeDeEntradaYSalida(event.target.value);
  };

  const onSave = () => {
    if (
      inputFecha.trim().length === 0 &&
      inputProductoExtra.trim().length === 0 &&
      inputCodigoDeProductoExtra.trim().length === 0 &&
      inputCantidadDeProductoExtra.trim().length === 0 &&
      inputUnidadesDeProductoExtra.trim().length === 0 &&
      inputCodigoDeMasa.trim().length === 0 &&
      inputMasa?.trim().length === 0 &&
      inputCantidadDeMasa.trim().length === 0 &&
      inputUnidadesDeMasa.trim().length === 0 &&
      inputRellenos.trim().length === 0 &&
      inputCodigosDeRelleno.trim().length === 0 &&
      inputCantidadDeProductoExtraRelleno.trim().length === 0 &&
      inputUnidadesDeRelleno.trim().length === 0 &&
      inputTemperaturaDeRellenos.trim().length === 0 &&
      inputSucursalAEnviar.trim().length === 0 &&
      inputDatosDeRepartidor.trim().length === 0 &&
      inputDatosDeLaRuta?.trim().length === 0 &&
      inputKilometrajeDeEntradaYSalida?.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a este reporte de salida?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoReporteDeSalida: ReporteDeSalida = {
          ...reporteDeSalida,
          fecha: inputFecha,
          productoExtra: inputProductoExtra,
          codigoDeProductoExtra: inputCodigoDeProductoExtra,
          cantidadDeProductoExtra: inputCantidadDeProductoExtra,
          unidadesDeProductoExtra: inputUnidadesDeProductoExtra,
          codigoDeMasa: inputCodigoDeMasa,
          masa: inputMasa,
          cantidadDeMasa: inputCantidadDeMasa,
          unidadesDeMasa: inputUnidadesDeMasa,
          rellenos: inputRellenos,
          codigosDeRelleno: inputCodigosDeRelleno,
          cantidadDeProductoExtraRelleno: inputCantidadDeProductoExtraRelleno,
          unidadesDeRelleno: inputUnidadesDeRelleno,
          temperaturaDeRellenos: inputTemperaturaDeRellenos,
          sucursalAEnviar: inputSucursalAEnviar,
          datosDeRepartidor: inputDatosDeRepartidor,
          datosDeLaRuta: inputDatosDeLaRuta,
          kilometrajeDeEntradaYSalida: inputKilometrajeDeEntradaYSalida,
        };

        actualizarReporteDeSalida(actualizadoReporteDeSalida, true);
        router.push("/gerencia-operativa/reporteDeSalida/VerReporteDeSalida");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este reporte de salida?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarReporteDeSalida(reporteDeSalida, true);
        router.push("/gerencia-operativa/reporteDeSalida/VerReporteDeSalida");
      }
    });
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Actualizar / Eliminar Candidato
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha
                </label>
                <input
                  type="date"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFecha}
                  onChange={onInputValueChangedFecha}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Producto Extra
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputProductoExtra}
                  onChange={onInputValueChangedProductoExtra}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de producto extra
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCodigoDeProductoExtra}
                  onChange={onInputValueChangedCodigoDeProductoExtra}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad de producto extra
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCantidadDeProductoExtra}
                  onChange={onInputValueChangedCantidadDeProductoExtra}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades de producto extra
                </label>
                <select
                  id="TxtProductos"
                  name="TxtProductos"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={inputUnidadesDeProductoExtra}
                  onChange={onInputValueChangedUnidadesDeProductoExtra}
                  //   onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  {validUnits.map((unidades) => (
                    <option key={unidades}>{unidades}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de masa
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCodigoDeMasa}
                  onChange={onInputValueChangedCodigoDeMasa}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Masa
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputMasa}
                  onChange={onInputValueChangedMasa}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad de masa
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCantidadDeMasa}
                  onChange={onInputValueChangedCantidadDeMasa}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades de masa
                </label>
                <select
                  id="TxtProductos"
                  name="TxtProductos"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={inputUnidadesDeMasa}
                  onChange={onInputValueChangedUnidadesDeMasa}
                  //   onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  {validUnits.map((unidades) => (
                    <option key={unidades}>{unidades}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rellenos
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputRellenos}
                  onChange={onInputValueChangedRellenos}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Códigos de relleno
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCodigosDeRelleno}
                  onChange={onInputValueChangedCodigosDeRelleno}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad de producto extra
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCantidadDeProductoExtraRelleno}
                  onChange={onInputValueChangedCantidadDeProductoExtraRelleno}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades de relleno
                </label>
                <select
                  id="TxtProductos"
                  name="TxtProductos"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={inputUnidadesDeRelleno}
                  onChange={onInputValueChangedUnidadesDeRelleno}
                  //   onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  {validUnits.map((unidades) => (
                    <option key={unidades}>{unidades}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Temperatura de rellenos
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputTemperaturaDeRellenos}
                  onChange={onInputValueChangedTemperaturaDeRellenos}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sucursal a enviar
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputSucursalAEnviar}
                  onChange={onInputValueChangedSucursalAEnviar}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Datos de Repartidor
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputDatosDeRepartidor}
                  onChange={onInputValueChangedDatosDeRepartidor}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Datos de la ruta
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputDatosDeLaRuta}
                  onChange={onInputValueChangedDatosDeLaRuta}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kilometraje de entrada y salida
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputKilometrajeDeEntradaYSalida}
                  onChange={onInputValueChangedKilometrajeDeEntradaYSalida}
                  //   onBlur={() => setTouched(true)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              className="mx-4 bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              onClick={onSave}
            >
              Actualizar
            </button>
            <button
              type="button"
              className="bg-red-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-600 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800"
              onClick={onDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayoutGerenciaOperativa>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const reporteDeSalida = await dbReporteDeSalida.getReporteDeSalidaById(id);

  if (!reporteDeSalida) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      reporteDeSalida,
    },
  };
};

export default ReporteDeSalidaPage;
