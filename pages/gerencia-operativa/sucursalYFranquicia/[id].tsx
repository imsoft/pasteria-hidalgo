import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SucursalYFranquicia } from "../../../interfaces";
import { SucursalesYFranquiciasContext } from '../../../context/gerencia-operativa/sucursalYFranquicia/SucursalYFranquiciaContext';
import { SidebarLayoutGerenciaOperativa } from '../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa';
import { dbSucursalYFranquicia } from "../../../database";

interface Props {
  sucursalYFranquicia: SucursalYFranquicia;
}

export const SucursalYFranquiciaPage: FC<Props> = ({ sucursalYFranquicia }) => {
  const router = useRouter();

  const { actualizarSucursalYFranquicia, eliminarSucursalYFranquicia } =
    useContext(SucursalesYFranquiciasContext);

  const [inputDireccion, setInputDireccion] = useState(sucursalYFranquicia.direccion);
  const [inputDistancia, setInputDistancia] = useState(sucursalYFranquicia.distancia);
  
  const MySwal = withReactContent(Swal);

  const [touched, setTouched] = useState(false);

  // const esDireccionValido = useMemo( () => inputDireccion.length <= 0 && touched, [inputDireccion, touched] );
  // const esDistanciaValido = useMemo( () => inputDistancia.length <= 0 && touched, [inputDistancia, touched] );

  const onInputValueChangedDireccion = (event: ChangeEvent<HTMLInputElement>) => {
    setInputDireccion(event.target.value);
  };

  const onInputValueChangedDistancia = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDistancia(event.target.value);
  };

  const onSave = () => {
    if (
      inputDireccion.trim().length === 0 &&
      inputDistancia.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a esta Sucursal O Franquicia?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoSucursalYFranquicia: SucursalYFranquicia = {
          ...sucursalYFranquicia,
          direccion: inputDireccion,
          distancia: inputDistancia,
        };

        actualizarSucursalYFranquicia(actualizadoSucursalYFranquicia, true);
        router.push("/gerencia-operativa/sucursalYFranquicia/VerSucursalesYFranquicias");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a esta Sucursal O Franquicia?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarSucursalYFranquicia(sucursalYFranquicia, true);
        router.push("/gerencia-operativa/sucursalYFranquicia/VerSucursalesYFranquicias");
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
                Agregar Sucursal O Franquicia
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDireccion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Direccion
                </label>
                <input
                  type="text"
                  name="TxtDireccion"
                  id="TxtDireccion"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputDireccion}
                  onChange={onInputValueChangedDireccion}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDistancia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Distancia
                </label>
                <input
                  type="text"
                  name="TxtDistancia"
                  id="TxtDistancia"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputDistancia}
                  onChange={onInputValueChangedDistancia}
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

  const sucursalYFranquicia = await dbSucursalYFranquicia.getSucursalYFranquiciaById(id);

  if (!sucursalYFranquicia) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      sucursalYFranquicia,
    },
  };
};
