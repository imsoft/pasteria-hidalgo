import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";
import { ChangeEvent, FC, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { AsignarComision } from "../../../interfaces/asignarComision";
import { AsignarComisionContext } from "../../../context/contaduria/asignarComision/AsignarComisionContext";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { GetServerSideProps } from "next";
import { dbAsignarComisiones } from "../../../database";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";

interface Props {
  asignarComision: AsignarComision;
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

export const AsignarComisionesPage: FC<Props> = ({ asignarComision }) => {
  const router = useRouter();

  const { actualizarAsignarComision, eliminarAsignarComision } = useContext(
    AsignarComisionContext
  );

  const { sucursalesYFranquicias, refreshSucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState(
    asignarComision.sucursalOFranquicia
  );
  const [inputNombreSucursalOFranquicia, setInputNombreSucursalOFranquicia] =
    useState("");
  const [inputMes, setInputMes] = useState(asignarComision.mes);
  const [inputAnio, setInputAnio] = useState(asignarComision.anio);
  const [inputMinimoDeLaMeta, setInputMinimoDeLaMeta] = useState(
    asignarComision.minimoDeLaMeta
  );

  const MySwal = withReactContent(Swal);

  const onInputValueChangedNombreSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputNombreSucursalOFranquicia(event.target.value);
  };

  const onInputValueChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const onInputValueChangedMes = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputMes(event.target.value);
  };

  const onInputValueChangedAnio = (event: ChangeEvent<HTMLInputElement>) => {
    setInputAnio(event.target.value);
  };
  const onInputValueChangedMinimoDeLaMeta = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputMinimoDeLaMeta(parseInt(event.target.value));
  };

  useEffect(() => {
    refreshSucursalesYFranquicias();
  }, []);

  const onSave = () => {
    if (
      inputNombreSucursalOFranquicia?.trim().length === 0 &&
      inputMes?.trim().length === 0 &&
      inputAnio?.trim().length === 0 &&
      inputMinimoDeLaMeta === 0 &&
      inputSucursalOFranquicia.trim().length === 0
    )
      return;

    MySwal.fire({
      title:
        "¿Quieres actualizar la información de esta asignación de comisión?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoAsignarComision: AsignarComision = {
          ...asignarComision,
          sucursalOFranquicia: inputSucursalOFranquicia,
          nombreSucursalOFranquicia: inputNombreSucursalOFranquicia,
          mes: inputMes,
          anio: inputAnio,
          minimoDeLaMeta: inputMinimoDeLaMeta,
        };

        actualizarAsignarComision(actualizadoAsignarComision, true);
        router.push("/contaduria/asignarComisiones/VerAsignarComisiones");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a esta asignación de comisión?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarAsignarComision(asignarComision, true);
        router.push("/contaduria/asignarComisiones/VerAsignarComisiones");
      }
    });
  };

  return (
    <SidebarLayoutContaduria>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Asignar comisiones
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  ¿Sucursal o Franquicia?
                </label>

                <div className="col-span-6 sm:col-span-3">
                  <select
                    id="CmbNombre"
                    name="CmbNombre"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                    defaultValue="Selecciona un producto..."
                    onChange={onInputValueChangedSucursalOFranquicia}
                    // onBlur={() => setTouched(true)}
                  >
                    <option hidden>Seleccione una opción...</option>
                    <option>Sucursal</option>
                    <option>Franquicia</option>
                  </select>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  {inputSucursalOFranquicia === "Sucursal"
                    ? "Sucursal"
                    : inputSucursalOFranquicia === "Franquicia"
                    ? "Franquicia"
                    : "Primero seleccione si es franquicia o sucursal"}
                </label>
                <select
                  id="CmbFranquicia"
                  name="CmbFranquicia"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onInputValueChangedNombreSucursalOFranquicia}
                  // onBlur={() => setTouched(true)}
                >
                  <option hidden>
                    Seleccione la{" "}
                    {inputSucursalOFranquicia === "Sucursal"
                      ? "Sucursal"
                      : inputSucursalOFranquicia === "Franquicia"
                      ? "Franquicia"
                      : "Primero seleccione si es franquicia o sucursal"}
                    ...
                  </option>
                  {sucursalesYFranquiciasMemo
                    .filter(
                      (sucursalesYFranquicias) =>
                        sucursalesYFranquicias.sucursalOFranquicia ===
                        inputSucursalOFranquicia
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

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbSucursal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mes
                </label>
                <select
                  id="CmbSucursal"
                  name="CmbSucursal"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  value={inputMes}
                  onChange={onInputValueChangedMes}
                  // onBlur={() => setTouched(true)}
                >
                  <option hidden>Seleccione una opción...</option>
                  {mesesDelAno.map((mes) => (
                    <option key={mes}>{mes}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtAnio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Año
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="TxtAnio"
                    id="TxtAnio"
                    onChange={onInputValueChangedAnio}
                    value={inputAnio}
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full sm:text-sm border-gray-300 rounded-md"
                    aria-describedby="price-currency"
                    readOnly
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtMinimoDeLaMeta"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mínimo de la meta
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtMinimoDeLaMeta"
                    id="TxtMinimoDeLaMeta"
                    value={inputMinimoDeLaMeta}
                    onChange={onInputValueChangedMinimoDeLaMeta}
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    aria-describedby="price-currency"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      MXN
                    </span>
                  </div>
                </div>
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
    </SidebarLayoutContaduria>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const asignarComision = await dbAsignarComisiones.getAsignarComisionById(id);

  if (!asignarComision) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      asignarComision,
    },
  };
};

export default AsignarComisionesPage;
