import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { ClienteFrecuente } from "../../../interfaces/clienteFrecuente";
import { ClientesFrecuentesContext } from "../../../context/gerencia-de-ventas/clienteFrecuente";
import { SidebarLayoutGerenciaVentas } from "../../../components/layouts/gerencia-de-ventas/SidebarLayoutGerenciaVentas";
import { dbClienteFrecuente } from "../../../database";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";

interface Props {
  clienteFrecuente: ClienteFrecuente;
}

export const ClienteFrecuentePage: FC<Props> = ({ clienteFrecuente }) => {
  const router = useRouter();

  const { actualizarClienteFrecuente, eliminarClienteFrecuente } = useContext(
    ClientesFrecuentesContext
  );

  const { sucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const [inputNombre, setInputNombre] = useState(clienteFrecuente.nombre);
  const [inputCorreoElectronico, setInputCorreoElectronico] = useState(
    clienteFrecuente.correoElectronico
  );
  const [inputFechaDeNacimiento, setInputFechaDeNacimiento] = useState(
    clienteFrecuente.fechaDeNacimiento
  );
  const [inputPuntosDeCompra, setInputPuntosDeCompra] = useState(
    clienteFrecuente.puntosDeCompra
  );

  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState(
    clienteFrecuente.sucursalOFranquicia
  );
  const [inputNombreSucursalOFranquicia, setInputNombreSucursalOFranquicia] =
    useState(clienteFrecuente.nombreSucursalOFranquicia);

  const MySwal = withReactContent(Swal);

  const [touched, setTouched] = useState(false);

  const onInputValueChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onInputValueChangedCorreoElectronico = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCorreoElectronico(event.target.value);
  };

  const onInputValueChangedFechaDeNacimiento = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeNacimiento(event.target.value);
  };

  const onInputValueChangedPuntosDeCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPuntosDeCompra(parseInt(event.target.value));
  };

  const onInputValueChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const onInputValueChangedNombreSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputNombreSucursalOFranquicia(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombre.trim().length === 0 &&
      inputCorreoElectronico.trim().length === 0 &&
      inputFechaDeNacimiento.trim().length === 0 &&
      inputPuntosDeCompra === 0 &&
      inputSucursalOFranquicia.trim().length === 0 &&
      inputNombreSucursalOFranquicia.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a este Cliente Frecuente?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoClienteFrecuente: ClienteFrecuente = {
          ...clienteFrecuente,
          nombre: inputNombre,
          fechaDeNacimiento: inputFechaDeNacimiento,
          correoElectronico: inputCorreoElectronico,
          puntosDeCompra: inputPuntosDeCompra,
          sucursalOFranquicia: inputSucursalOFranquicia,
          nombreSucursalOFranquicia: inputNombreSucursalOFranquicia,
        };

        actualizarClienteFrecuente(actualizadoClienteFrecuente, true);
        router.push(
          "/gerencia-de-ventas/clienteFrecuente/VerClientesFrecuentes"
        );
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este Cliente Frecuente?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarClienteFrecuente(clienteFrecuente, true);
        router.push(
          "/gerencia-de-ventas/clienteFrecuente/VerClientesFrecuentes"
        );
      }
    });
  };

  return (
    <SidebarLayoutGerenciaVentas>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Agregar Cliente Frecuente
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
                    value={inputSucursalOFranquicia}
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
                  value={inputNombreSucursalOFranquicia}
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
                  htmlFor="TxtNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="TxtNombre"
                  id="TxtNombre"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputNombre}
                  onChange={onInputValueChangedNombre}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaNacimiento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  name="TxtFechaNacimiento"
                  id="TxtFechaNacimiento"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFechaDeNacimiento}
                  onChange={onInputValueChangedFechaDeNacimiento}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCorreoElectronico"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <input
                  type="text"
                  name="TxtCorreoElectronico"
                  id="TxtCorreoElectronico"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCorreoElectronico}
                  onChange={onInputValueChangedCorreoElectronico}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPuntosDeCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Puntos De Compra
                </label>
                <input
                  type="number"
                  name="TxtPuntosDeCompra"
                  id="TxtPuntosDeCompra"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputPuntosDeCompra || ""}
                  onChange={onInputValueChangedPuntosDeCompra}
                  // onBlur={() => setTouched(true)}
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
    </SidebarLayoutGerenciaVentas>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const clienteFrecuente = await dbClienteFrecuente.getClienteFrecuenteById(id);

  if (!clienteFrecuente) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      clienteFrecuente,
    },
  };
};

export default ClienteFrecuentePage;
