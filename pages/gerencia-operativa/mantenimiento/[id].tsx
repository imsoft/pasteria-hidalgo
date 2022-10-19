import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { MantenimientosContext } from "../../../context/gerencia-operativa/mantenimiento/MantenimientoContext";

import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import { dbMantenimiento } from "../../../database";

import { Mantenimiento } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Props {
  mantenimiento: Mantenimiento;
}

export const MantenimientoPage: FC<Props> = ({ mantenimiento }) => {
  const router = useRouter();

  const { actualizarMantenimiento, eliminarMantenimiento } = useContext(
    MantenimientosContext
  );

  const [inputNombreMaquina, setInputNombreMaquina] = useState(
    mantenimiento.nombreMaquina
  );
  const [inputProveedor, setInputProveedor] = useState(mantenimiento.proveedor);
  const [inputFechaDeGarantia, setInputFechaDeGarantia] = useState(
    mantenimiento.fechaDeGarantia
  );
  const [inputFechaDeMantenimiento, setInputFechaDeMantenimiento] = useState(
    mantenimiento.fechaDeMantenimiento
  );
  const [
    inputModificacionDeMantenimiento,
    setInputModificacionDeMantenimiento,
  ] = useState(mantenimiento.modificacionDeMantenimiento);

  const MySwal = withReactContent(Swal);

  const onInputValueChangedNombreMaquina = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombreMaquina(event.target.value);
  };

  const onInputValueChangedProveedor = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputProveedor(event.target.value);
  };

  const onInputValueChangedFechaDeGarantia = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeGarantia(event.target.value);
  };

  const onInputValueChangedFechaDeMantenimiento = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeMantenimiento(event.target.value);
  };

  const onInputValueChangedModificacionDeMantenimiento = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputModificacionDeMantenimiento(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombreMaquina.trim().length === 0 &&
      inputProveedor.trim().length === 0 &&
      inputFechaDeGarantia.trim().length === 0 &&
      inputFechaDeMantenimiento.trim().length === 0 &&
      inputModificacionDeMantenimiento.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a este mantenimiento?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoMantenimiento: Mantenimiento = {
          ...mantenimiento,
          nombreMaquina: inputNombreMaquina,
          proveedor: inputProveedor,
          fechaDeGarantia: inputFechaDeGarantia,
          fechaDeMantenimiento: inputFechaDeMantenimiento,
          modificacionDeMantenimiento: inputModificacionDeMantenimiento,
        };

        actualizarMantenimiento(actualizadoMantenimiento, true);
        router.push("/gerencia-operativa/mantenimiento/VerMantenimiento");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este mantenimiento?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarMantenimiento(mantenimiento, true);
        router.push("/gerencia-operativa/mantenimiento/VerMantenimiento");
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
                Mantenimiento
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombreMaquina"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Maquina
                </label>
                <input
                  type="text"
                  name="TxtNombreMaquina"
                  id="TxtNombreMaquina"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputNombreMaquina}
                  onChange={onInputValueChangedNombreMaquina}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProveedor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Proveedor
                </label>
                <input
                  type="text"
                  name="TxtProveedor"
                  id="TxtProveedor"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputProveedor}
                  onChange={onInputValueChangedProveedor}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeGarantia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha De Garantía
                </label>
                <input
                  type="text"
                  name="TxtFechaDeGarantia"
                  id="TxtFechaDeGarantia"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFechaDeGarantia}
                  onChange={onInputValueChangedFechaDeGarantia}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeMantenimiento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha De Mantenimiento
                </label>
                <input
                  type="text"
                  name="TxtFechaDeMantenimiento"
                  id="TxtFechaDeMantenimiento"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFechaDeMantenimiento}
                  onChange={onInputValueChangedFechaDeMantenimiento}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtModificacionDeMantenimiento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modificación De Mantenimiento
                </label>
                <input
                  type="text"
                  name="TxtModificacionDeMantenimiento"
                  id="TxtModificacionDeMantenimiento"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputModificacionDeMantenimiento}
                  onChange={onInputValueChangedModificacionDeMantenimiento}
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
    </SidebarLayoutGerenciaOperativa>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const mantenimiento = await dbMantenimiento.getMantenimientoById(id);

  if (!mantenimiento) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      mantenimiento,
    },
  };
};

export default MantenimientoPage;
