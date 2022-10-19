import { ChangeEvent, useContext, useState } from "react";
import { useRouter } from 'next/router';

import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

import { AsignarPreciosContext } from "../../../context/gerencia-de-compras/asignarPrecios/AsignarPreciosContext";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function AgregarCandidato() {

  const router = useRouter();

  const { agregarNuevoAsignarPrecio } = useContext(AsignarPreciosContext);

  const [inputProducto, setInputProducto] = useState("");
  const [inputPrecioMaximo, setInputPrecioMaximo] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedProducto = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputProducto(event.target.value);
  };

  const onTextFieldChangedPrecioMaximo = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioMaximo(event.target.value);
  };

  const onSave = () => {
    if (inputProducto.length === 0 && inputPrecioMaximo.length === 0) return;

    agregarNuevoAsignarPrecio(inputProducto, inputPrecioMaximo, true);

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Precio Asignado",
      showConfirmButton: false,
      timer: 5000,
    });

    router.push("/gerencia-de-compras/asignarPrecios/VerAsignarPrecio");

    setTouched(false);
    setInputProducto("");
    setInputPrecioMaximo("");
  };

  return (
    <SidebarLayoutGerenciaCompras>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Asignar Precio
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
                  onChange={onTextFieldChangedProducto}
                  onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona un producto...</option>
                  <option>Masa</option>
                  <option>Fresas</option>
                  <option>Leche</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioMaximo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio Máximo
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
                    onChange={onTextFieldChangedPrecioMaximo}
                    onBlur={() => setTouched(true)}
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
              className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              onClick={onSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayoutGerenciaCompras>
  );
}
