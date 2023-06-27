import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ManejoDeAlmacen } from "../../../interfaces";
import { ManejosDeAlmacenContext } from "../../../context/gerencia-operativa/manejoDeAlmacen";
import { dbManejoDeAlmacen } from "../../../database";

interface Props {
  manejoDeAlmacen: ManejoDeAlmacen;
}

export const ManejoDeAlmacenPage: FC<Props> = ({ manejoDeAlmacen }) => {
  const router = useRouter();

  const { actualizarManejoDeAlmacen, eliminarManejoDeAlmacen } = useContext(
    ManejosDeAlmacenContext
  );

  const [inputMateriaPrima, setInputMateriaPrima] = useState(
    manejoDeAlmacen.materiaPrima
  );
  const [inputUnidades, setInputUnidades] = useState(manejoDeAlmacen.unidades);
  const [inputTemperatura, setInputTemperatura] = useState(
    manejoDeAlmacen.temperatura
  );
  const [inputCantidad, setInputCantidad] = useState(manejoDeAlmacen.cantidad);

  const MySwal = withReactContent(Swal);

  const onInputValueChangedMateriaPrima = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputMateriaPrima(event.target.value);
  };

  const onInputValueChangedUnidades = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputUnidades(event.target.value);
  };

  const onInputValueChangedTemperatura = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputTemperatura(event.target.value);
  };

  const onInputValueChangedCantidad = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCantidad(parseInt(event.target.value));
  };

  const onSave = () => {
    if (
      inputMateriaPrima.trim().length === 0 &&
      inputUnidades.trim().length === 0 &&
      inputTemperatura.trim().length === 0 &&
      inputCantidad === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a este manejo de almacen?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoManejoDeAlmacen: ManejoDeAlmacen = {
          ...manejoDeAlmacen,
          materiaPrima: inputMateriaPrima,
          unidades: inputUnidades,
          temperatura: inputTemperatura,
          cantidad: inputCantidad,
        };

        actualizarManejoDeAlmacen(actualizadoManejoDeAlmacen, true);
        router.push("/gerencia-operativa/manejoDeAlmacen/VerManejoDeAlmacen");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a esta manejo de almancen?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarManejoDeAlmacen(manejoDeAlmacen, true);
        router.push("/gerencia-operativa/manejoDeAlmacen/VerManejoDeAlmacen");
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
                Manejo de almacen
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              {/* <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtMateriaPrima"
                  className="block text-sm font-medium text-gray-700"
                >
                  Materia Prima
                </label>
                <input
                  type="text"
                  name="TxtMateriaPrima"
                  id="TxtMateriaPrima"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputMateriaPrima}
                  onChange={onInputValueChangedMateriaPrima}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtUnidades"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades
                </label>
                <input
                  type="text"
                  name="TxtUnidades"
                  id="TxtUnidades"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputUnidades}
                  onChange={onInputValueChangedUnidades}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTemperatura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Temperatura
                </label>
                <input
                  type="text"
                  name="TxtTemperatura"
                  id="TxtTemperatura"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputTemperatura}
                  onChange={onInputValueChangedTemperatura}
                />
              </div> */}

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCantidad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad de {inputMateriaPrima}
                </label>
                <input
                  type="text"
                  name="TxtCantidad"
                  id="TxtCantidad"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCantidad}
                  onChange={onInputValueChangedCantidad}
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

  const manejoDeAlmacen = await dbManejoDeAlmacen.getManejoDeAlmacenById(id);

  if (!manejoDeAlmacen) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      manejoDeAlmacen,
    },
  };
};

export default ManejoDeAlmacenPage;
