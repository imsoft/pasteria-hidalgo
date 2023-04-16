import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { AsignarPreciosContext } from "../../../context/gerencia-de-compras/asignarPrecios/AsignarPreciosContext";

import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

import { dbAsignarPrecio } from "../../../database";

import { AsignarPrecio } from "../../../interfaces/asignarPrecio";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MateriasPrimasContext } from "../../../context/gerencia-operativa/materiaPrima";

interface Props {
  asignarPrecio: AsignarPrecio;
}

export const AsignarPrecioPage: FC<Props> = ({ asignarPrecio }) => {
  const router = useRouter();

  const { actualizarAsignarPrecio, eliminarAsignarPrecio } = useContext(
    AsignarPreciosContext
  );

  const { materiasPrimas } = useContext(MateriasPrimasContext);
  const materiasPrimasMemo = useMemo(() => materiasPrimas, [materiasPrimas]);

  const [inputProducto, setInputProducto] = useState(asignarPrecio.producto);
  const [inputPrecioMaximo, setInputPrecioMaximo] = useState(
    asignarPrecio.precioMaximo
  );

  const MySwal = withReactContent(Swal);

  const onInputValueChangedProducto = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputProducto(event.target.value);
  };

  const onInputValueChangedPrecioMaximo = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioMaximo(event.target.value);
  };

  const onSave = () => {
    if (
      inputProducto.trim().length === 0 &&
      inputPrecioMaximo.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a este Precio asignado?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoAsignarPrecio: AsignarPrecio = {
          ...asignarPrecio,
          producto: inputProducto,
          precioMaximo: inputPrecioMaximo,
        };

        actualizarAsignarPrecio(actualizadoAsignarPrecio, true);
        router.push("/gerencia-de-compras/asignarPrecios/VerAsignarPrecio");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a esta asignación de precio?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarAsignarPrecio(asignarPrecio, true);
        router.push("/gerencia-de-compras/asignarPrecios/VerAsignarPrecio");
      }
    });
  };

  return (
    <SidebarLayoutGerenciaCompras>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Asignar Precios
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Producto
                </label>
                <select
                  id="TxtProducto"
                  name="TxtProducto"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={inputProducto}
                  onChange={onInputValueChangedProducto}
                  //   onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option hidden>Selecciona un producto...</option>
                  {materiasPrimasMemo.map((materiaPrima) => (
                    <option key={materiaPrima._id}>
                      {" "}
                      {materiaPrima.materiaPrima}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioMaximo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio Máximo{" "}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtPrecioMaximo"
                    id="TxtPrecioMaximo"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={inputPrecioMaximo}
                    onChange={onInputValueChangedPrecioMaximo}
                    //   onBlur={() => setTouched(true)}
                    placeholder="0.00"
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
    </SidebarLayoutGerenciaCompras>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const asignarPrecio = await dbAsignarPrecio.getAsignarPrecioById(id);

  if (!asignarPrecio) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      asignarPrecio,
    },
  };
};

export default AsignarPrecioPage;
