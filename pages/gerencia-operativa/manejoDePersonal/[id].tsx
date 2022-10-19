import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { ManejosDePersonalContext } from '../../../context/gerencia-operativa/manejoDePersonal/ManejoDePersonalContext';

import { SidebarLayoutGerenciaOperativa } from '../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa';

import { dbManejoPersonal } from "../../../database";

import { ManejoPersonal } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Props {
  manejoDePersonal: ManejoPersonal;
}

export const ManejoPersonalPage: FC<Props> = ({ manejoDePersonal }) => {
  const router = useRouter();

  const { actualizarManejoDePersonal, eliminarManejoDePersonal } =
    useContext(ManejosDePersonalContext);

  const [inputNombre, setInputNombre] = useState(manejoDePersonal.nombre);
  const [inputDescripcionDelPuesto, setInputDescripcionDelPuesto] = useState(manejoDePersonal.descripcionDelPuesto);
  
  const MySwal = withReactContent(Swal);

  const onInputValueChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onInputValueChangedDescripcionDelPuesto = (event: ChangeEvent<HTMLInputElement>) => {
    setInputDescripcionDelPuesto(event.target.value);
  };


  const onSave = () => {
    if (
      inputNombre.trim().length === 0 &&
      inputDescripcionDelPuesto.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a este manejo de personal?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoManejoPersonal: ManejoPersonal = {
          ...manejoDePersonal,
          nombre: inputNombre,
          descripcionDelPuesto: inputDescripcionDelPuesto,
        };

        actualizarManejoDePersonal(actualizadoManejoPersonal, true);
        router.push("/gerencia-operativa/manejoDePersonal/VerManejosDePersonal");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este manejo de personal?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarManejoDePersonal(manejoDePersonal, true);
        router.push("/gerencia-operativa/manejoDePersonal/VerManejosDePersonal");
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
                Agregar Manejo de Personal
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
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
                  htmlFor="TxtDescripcionDelPuesto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción Del Puesto
                </label>
                <input
                  type="text"
                  name="TxtDescripcionDelPuesto"
                  id="TxtDescripcionDelPuesto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputDescripcionDelPuesto}
                  onChange={onInputValueChangedDescripcionDelPuesto}
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

  const manejoPersonal = await dbManejoPersonal.getManejoPersonalById(id);

  if (!manejoPersonal) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      manejoPersonal,
    },
  };
};

export default ManejoPersonalPage;
