import { ChangeEvent, FC, useContext, useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { CheckInPersonalContext } from "../../../context/recursos-humanos/checkInPersonal/checkInPersonalContext";

import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";

import { dbCheckInPersonal } from "../../../database";

import { CheckInPersonal } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";

interface Props {
  checkInDePersonal: CheckInPersonal;
}

export const CheckInPersonalPage: FC<Props> = ({ checkInDePersonal }) => {
  const router = useRouter();

  const { actualizarCheckInPersonal, eliminarCheckInPersonal } = useContext(
    CheckInPersonalContext
  );

  const { sucursalesYFranquicias, refreshSucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const [inputNombreSucursalOFranquicia, setInputNombreSucursalOFranquicia] =
    useState(checkInDePersonal.nombreSucursalOFranquicia);
  const [inputNombre, setInputNombre] = useState(checkInDePersonal.nombre);
  const [inputFecha, setInputFecha] = useState(checkInDePersonal.fecha);
  const [inputHoraDeIngreso, setInputHoraDeIngreso] = useState(
    checkInDePersonal.horaDeIngreso
  );
  const [inputHoraDeSalida, setInputHoraDeSalida] = useState(
    checkInDePersonal.horaDeSalida
  );
  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState(
    checkInDePersonal.sucursalOFranquicia
  );

  const MySwal = withReactContent(Swal);

  const onInputValueChangedNombreSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputNombreSucursalOFranquicia(event.target.value);
  };

  const onInputValueChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onInputValueChangedFecha = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFecha(event.target.value);
  };

  const onInputValueChangedHoraDeIngreso = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputHoraDeIngreso(event.target.value);
  };

  const onInputValueChangedHoraDeSalida = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputHoraDeSalida(event.target.value);
  };

  const onInputValueChangedsInputSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  useEffect(() => {
    refreshSucursalesYFranquicias();
  }, []);

  const onSave = () => {
    if (
      inputNombreSucursalOFranquicia?.trim().length === 0 &&
      inputNombre.trim().length === 0 &&
      inputFecha.trim().length === 0 &&
      inputHoraDeIngreso.trim().length === 0 &&
      inputHoraDeSalida.trim().length === 0 &&
      inputSucursalOFranquicia.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información de este Check In?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoCheckInDePersonal: CheckInPersonal = {
          ...checkInDePersonal,
          sucursalOFranquicia: inputSucursalOFranquicia,
          nombreSucursalOFranquicia: inputNombreSucursalOFranquicia,
          nombre: inputNombre,
          fecha: inputFecha,
          horaDeIngreso: inputHoraDeIngreso,
          horaDeSalida: inputHoraDeSalida,
        };

        actualizarCheckInPersonal(actualizadoCheckInDePersonal, true);
        router.push("/recursos-humanos/checkInPersonal/VerCheckInPersonal");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este Check In De Personal?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarCheckInPersonal(checkInDePersonal, true);
        router.push("/recursos-humanos/checkInPersonal/VerCheckInPersonal");
      }
    });
  };

  return (
    <SidebarLayoutRecursosHumanos>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Check In Personal
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
                    onChange={onInputValueChangedsInputSucursalOFranquicia}
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
                  onChange={onInputValueChangedFecha}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHoraDeIngreso"
                  className="block text-sm font-medium text-gray-700"
                >
                  HoraDeIngreso
                </label>
                <input
                  type="time"
                  name="TxtHoraDeIngreso"
                  id="TxtHoraDeIngreso"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputHoraDeIngreso}
                  onChange={onInputValueChangedHoraDeIngreso}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHoraDeSalida"
                  className="block text-sm font-medium text-gray-700"
                >
                  HoraDeSalida
                </label>
                <input
                  type="time"
                  name="TxtHoraDeSalida"
                  id="TxtHoraDeSalida"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputHoraDeSalida}
                  onChange={onInputValueChangedHoraDeSalida}
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
    </SidebarLayoutRecursosHumanos>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const checkInDePersonal = await dbCheckInPersonal.getCheckInPersonalById(id);

  if (!checkInDePersonal) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      checkInDePersonal,
    },
  };
};

export default CheckInPersonalPage;
