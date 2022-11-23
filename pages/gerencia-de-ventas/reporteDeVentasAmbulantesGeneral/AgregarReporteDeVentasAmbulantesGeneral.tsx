import { SidebarLayoutGerenciaVentas } from "../../../components/layouts/gerencia-de-ventas/SidebarLayoutGerenciaVentas";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AgregarReporteDeVentasAmbulantes = () => {
  const MySwal = withReactContent(Swal);

  const onSave = () => {
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Reporte de ventas Ambulantes General Agregado",
      showConfirmButton: false,
      timer: 5000,
    });
  };

  return (
    <SidebarLayoutGerenciaVentas>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Reporte de ventas Ambulantes General
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <select
                  id="CmbNombre"
                  name="CmbNombre"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  // onChange={onTextFieldChangedUnidades}
                  // onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  <option>Vendedor #1</option>
                  <option>Vendedor #2</option>
                  <option>Vendedor #3</option>
                  <option>Vendedor #4</option>
                  <option>Vendedor #5</option>
                  <option>Vendedor #6</option>
                  <option>Vendedor #7</option>
                  <option>Vendedor #8</option>
                  <option>Vendedor #9</option>
                  <option>Vendedor #10</option>
                </select>
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
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCantidadDeVentas"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad de ventas
                </label>
                <input
                  type="text"
                  name="TxtCantidadDeVentas"
                  id="TxtCantidadDeVentas"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              onClick={onSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayoutGerenciaVentas>
  );
};

export default AgregarReporteDeVentasAmbulantes;
