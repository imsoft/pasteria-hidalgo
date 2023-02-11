import { ChangeEvent, useContext, useState } from "react";
import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AsignarComisionContext } from "../../../context/contaduria/asignarComision/AsignarComisionContext";

export default function AgregarAsignarComisiones() {
  const router = useRouter();

  const { agregarNuevoAsignarComision } = useContext(AsignarComisionContext);

  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState("");
  const [inputFranquicias, setInputFranquicias] = useState("");
  const [inputSucursales, setInputSucursales] = useState("");
  const [inputMinimoDeLaMeta, setInputMinimoDeLaMeta] = useState(0);

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onSave = () => {
    if (
      inputSucursalOFranquicia.length === 0 &&
      inputMinimoDeLaMeta === 0 &&
      inputSucursales.length === 0 &&
      inputFranquicias.length === 0
    )
      return;

    agregarNuevoAsignarComision(
      inputSucursalOFranquicia,
      inputMinimoDeLaMeta,
      inputSucursales,
      inputFranquicias,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Asignación de precio Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    router.push("/contaduria/contaduria/VerAsignarComisiones");

    setInputSucursalOFranquicia("");
    setInputMinimoDeLaMeta(0);
    setInputSucursales("");
    setInputFranquicias("");
  };

  const onTextFieldChangedFranquicias = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputFranquicias(event.target.value);
  };

  const onTextFieldChangedSucursales = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursales(event.target.value);
  };

  const onTextFieldChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const onTextFieldChangedMinimoDeLaMeta = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputMinimoDeLaMeta(parseInt(event.target.value));
  };

  return (
    <SidebarLayoutContaduria>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Asignar comisiones
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>

              <div className="col-span-6 sm:col-span-3">
                <select
                  id="CmbNombre"
                  name="CmbNombre"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedSucursalOFranquicia}
                  onBlur={() => setTouched(true)}
                >
                  <option>Seleccione una opción...</option>
                  <option>Sucursal</option>
                  <option>Franquicia</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div
                className={` ${
                  inputSucursalOFranquicia === "Franquicia" || "hidden"
                } col-span-6`}
              >
                <label
                  htmlFor="CmbFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Franquicia
                </label>
                <select
                  id="CmbFranquicia"
                  name="CmbFranquicia"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedFranquicias}
                  onBlur={() => setTouched(true)}
                >
                  <option>Seleccione la franquicia...</option>
                  <option>Chapultepec</option>
                  <option>Chapalita</option>
                  <option>Chiapas</option>
                </select>
              </div>

              <div
                className={` ${
                  inputSucursalOFranquicia === "Sucursal" || "hidden"
                } col-span-6`}
              >
                <label
                  htmlFor="CmbSucursal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sucursal
                </label>
                <select
                  id="CmbSucursal"
                  name="CmbSucursal"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedSucursales}
                  onBlur={() => setTouched(true)}
                >
                  <option>Seleccione la sucursal...</option>
                  <option>Chapultepec</option>
                  <option>Chapalita</option>
                  <option>Chiapas</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtMinimoDeLaMeta"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mínimo de la meta
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtMinimoDeLaMeta"
                    id="TxtMinimoDeLaMeta"
                    onChange={onTextFieldChangedMinimoDeLaMeta}
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
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
    </SidebarLayoutContaduria>
  );
}
