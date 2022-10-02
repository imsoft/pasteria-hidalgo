import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { CheckInPersonal } from "../../../interfaces";
import { CheckInPersonalContext } from "../../../context/recursos-humanos/checkInPersonal/checkInPersonalContext";
import { dbCheckInPersonal } from "../../../database";
import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Props {
  checkInDePersonal: CheckInPersonal;
}

export const CheckInPersonalPage: FC<Props> = ({ checkInDePersonal }) => {
  const router = useRouter();

  const { actualizarCheckInPersonal, eliminarCheckInPersonal } = useContext(
    CheckInPersonalContext
  );

  const [inputIdFranquicia, setInputIdFranquicia] = useState(checkInDePersonal.idSucursal);
  const [inputIdSucursal, setInputIdSucursal] = useState(checkInDePersonal.idSucursal);
  const [inputNombre, setInputNombre] = useState(checkInDePersonal.nombre);
  const [inputFecha, setInputFecha] = useState(checkInDePersonal.fecha);
  const [inputIdPersonal, setInputIdPersonal] = useState(checkInDePersonal.idPersonal);
  const [inputHoraDeIngreso, setInputHoraDeIngreso] = useState(checkInDePersonal.horaDeIngreso);
  const [inputHoraDeSalida, setInputHoraDeSalida] = useState(checkInDePersonal.horaDeSalida);

  const MySwal = withReactContent(Swal);

  const onInputValueChangedIdFranquicia = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputIdFranquicia(event.target.value);
  };

  const onInputValueChangedIdSucursal = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputIdSucursal(event.target.value);
  };

  const onInputValueChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onInputValueChangedFecha = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFecha(event.target.value);
  };

  const onInputValueChangedIdPersonal = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputIdPersonal(event.target.value);
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

  const onSave = () => {
    if (
      inputIdFranquicia.trim().length === 0 &&
      inputIdSucursal.trim().length === 0 &&
      inputNombre.trim().length === 0 &&
      inputFecha.trim().length === 0 &&
      inputIdPersonal.trim().length === 0 &&
      inputHoraDeIngreso.trim().length === 0 &&
      inputHoraDeSalida.trim().length === 0
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
          idFranquicia: inputIdFranquicia,
          idSucursal: inputIdSucursal,
          nombre: inputNombre,
          fecha: inputFecha,
          idPersonal: inputIdPersonal,
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
                Actualizar / Eliminar Check In Personal
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtIdFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  IdFranquicia
                </label>
                <input
                  type="text"
                  name="TxtIdFranquicia"
                  id="TxtIdFranquicia"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputIdFranquicia}
                  onChange={onInputValueChangedIdFranquicia}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtIdSucursal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Id Sucursal
                </label>
                <input
                  type="text"
                  name="TxtIdSucursal"
                  id="TxtIdSucursal"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputIdSucursal}
                  onChange={onInputValueChangedIdSucursal}
                  // onBlur={() => setTouched(true)}
                />
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
                  htmlFor="TxtIdPersonal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Id Personal
                </label>
                <input
                  type="text"
                  name="TxtIdPersonal"
                  id="TxtIdPersonal"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputIdPersonal}
                  onChange={onInputValueChangedIdPersonal}
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
                  type="text"
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
                  type="text"
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
