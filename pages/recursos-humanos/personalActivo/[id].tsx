import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";

import { PersonalActivo } from "../../../interfaces/personalActivo";
import { PersonalActivoContext } from "../../../context/recursos-humanos/personalActivo/PersonalActivoContext";
import { dbPersonalActivo } from "../../../database";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Props {
  personalActivo: PersonalActivo;
}

export const PersonalActivoPage: FC<Props> = ({ personalActivo }) => {
  
  const router = useRouter();

  const { actualizarPersonalActivo, eliminarPersonalActivo } = useContext(PersonalActivoContext);

  const [inputNombre, setInputNombre] = useState(personalActivo.nombre);
  const [inputPuesto, setInputDescripcionDelPuesto] = useState(personalActivo.puesto);
  const [inputFechaDeContratacion, setInputFechaDeNacimiento] = useState(personalActivo.fechaDeContratacion);
  const [inputNoContrato, setInputDomicilio] = useState(personalActivo.noContrato);
  const [inputNoExpediente, setInputCurp] = useState(personalActivo.noExpediente);

  const MySwal = withReactContent(Swal);

  const [touched, setTouched] = useState(false);

  const onInputValueChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onInputValueChangedPuesto = (event: ChangeEvent<HTMLInputElement>) => {
    setInputDescripcionDelPuesto(event.target.value);
  };

  const onInputValueChangedFechaDeContratacion = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFechaDeNacimiento(event.target.value);
  };

  const onInputValueChangedNoContrato = (event: ChangeEvent<HTMLInputElement>) => {
    setInputDomicilio(event.target.value);
  };

  const onInputValueChangedNoExpediente = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCurp(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombre.trim().length === 0 &&
      inputPuesto.trim().length === 0 &&
      inputFechaDeContratacion.trim().length === 0 &&
      inputNoContrato.trim().length === 0 &&
      inputNoExpediente.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a este Personal Activo?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoPersonalActivo: PersonalActivo = {
          ...personalActivo,
          nombre: inputNombre,
          puesto: inputPuesto,
          fechaDeContratacion: inputFechaDeContratacion,
          noContrato: inputNoContrato,
          noExpediente: inputNoExpediente,
        };

        actualizarPersonalActivo(actualizadoPersonalActivo, true);
        router.push("/recursos-humanos/personalActivo/VerPersonalActivo");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este personal activo?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarPersonalActivo(personalActivo, true);
        router.push("/recursos-humanos/personalActivo/VerPersonalActivo");
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
                Actualizar Personal Activo
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>

            <div className="grid grid-cols-6 gap-6">
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
                  htmlFor="TxtPuesto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Puesto
                </label>
                <input
                  type="text"
                  name="TxtPuesto"
                  id="TxtPuesto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputPuesto}
                  onChange={onInputValueChangedPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeContratacion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha De Contratación
                </label>
                <input
                  type="date"
                  name="TxtFechaDeContratacion"
                  id="TxtFechaDeContratacion"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFechaDeContratacion}
                  onChange={onInputValueChangedFechaDeContratacion}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNoContrato"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de nacimiento
                </label>
                <input
                  type="text"
                  name="TxtNoContrato"
                  id="TxtNoContrato"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputNoContrato}
                  onChange={onInputValueChangedNoContrato}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNoExpediente"
                  className="block text-sm font-medium text-gray-700"
                >
                  NoExpediente
                </label>
                <input
                  type="text"
                  name="TxtNoExpediente"
                  id="TxtNoExpediente"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputNoExpediente}
                  onChange={onInputValueChangedNoExpediente}
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

  const personalActivo = await dbPersonalActivo.getPersonalActivoById(id);

  if (!personalActivo) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      personalActivo,
    },
  };
};

export default PersonalActivoPage;
