import { SidebarLayoutGerenciaVentas } from "../../../components/layouts/gerencia-de-ventas/SidebarLayoutGerenciaVentas";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AgregarReporteVentaAmbulantesIndividual = () => {
  const MySwal = withReactContent(Swal);

  const onSave = () => {
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Reporte de ventas Ambulantes Individial Agregado",
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
                Reporte de ventas Ambulantes Individual
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCodigoDeReporte"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de reporte
                </label>
                <input
                  type="text"
                  name="TxtCodigoDeReporte"
                  id="TxtCodigoDeReporte"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

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
                  htmlFor="CmbTipoDeEvento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo de evento
                </label>
                <select
                  id="CmbTipoDeEvento"
                  name="CmbTipoDeEvento"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  // onChange={onTextFieldChangedUnidades}
                  // onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  <option>Franquicia</option>
                  <option>Sucursal</option>
                  <option>Evento</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionDelProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción del producto
                </label>
                <input
                  type="text"
                  name="TxtDescripcionDelProducto"
                  id="TxtDescripcionDelProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtSupervisor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Supervisor
                </label>
                <input
                  type="text"
                  name="TxtSupervisor"
                  id="TxtSupervisor"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPuntoDeVenta"
                  className="block text-sm font-medium text-gray-700"
                >
                  Punto de venta
                </label>
                <input
                  type="text"
                  name="TxtPuntoDeVenta"
                  id="TxtPuntoDeVenta"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCodigoDeProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de producto
                </label>
                <input
                  type="text"
                  name="TxtCodigoDeProducto"
                  id="TxtCodigoDeProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCodigoDeProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de producto
                </label>
                <input
                  type="text"
                  name="TxtCodigoDeProducto"
                  id="TxtCodigoDeProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Pastes
                </h3>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDulces"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dulces
                </label>
                <input
                  type="text"
                  name="TxtDulces"
                  id="TxtDulces"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtSalados"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salados
                </label>
                <input
                  type="text"
                  name="TxtSalados"
                  id="TxtSalados"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDulces"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dulces
                </label>
                <input
                  type="text"
                  name="TxtDulces"
                  id="TxtDulces"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtSalados"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salados
                </label>
                <input
                  type="text"
                  name="TxtSalados"
                  id="TxtSalados"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Devueltos
                </h3>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDulces"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dulces
                </label>
                <input
                  type="text"
                  name="TxtDulces"
                  id="TxtDulces"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtSalados"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salados
                </label>
                <input
                  type="text"
                  name="TxtSalados"
                  id="TxtSalados"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioPorProductoIndividual"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio por producto individual
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtPrecioPorProductoIndividual"
                    id="TxtPrecioPorProductoIndividual"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    // value={
                    //   isNaN(inputPrecioPorUnidad) ? 0 : inputPrecioPorUnidad
                    // }
                    // onChange={onTextFieldChangedPrecioPorUnidad}
                    // onBlur={() => setTouched(true)}
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

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTotalDePastes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total de pastes
                </label>
                <input
                  type="text"
                  name="TxtTotalDePastes"
                  id="TxtTotalDePastes"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTotalDeMonto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total de monto
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtTotalDeMonto"
                    id="TxtTotalDeMonto"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    // value={
                    //   isNaN(inputPrecioPorUnidad) ? 0 : inputPrecioPorUnidad
                    // }
                    // onChange={onTextFieldChangedPrecioPorUnidad}
                    // onBlur={() => setTouched(true)}
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

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtComisiones"
                  className="block text-sm font-medium text-gray-700"
                >
                  Comisiones
                </label>
                <input
                  type="text"
                  name="TxtComisiones"
                  id="TxtComisiones"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtValorDeLaComision"
                  className="block text-sm font-medium text-gray-700"
                >
                  Valor de la comisión
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtValorDeLaComision"
                    id="TxtValorDeLaComision"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    // value={
                    //   isNaN(inputPrecioPorUnidad) ? 0 : inputPrecioPorUnidad
                    // }
                    // onChange={onTextFieldChangedPrecioPorUnidad}
                    // onBlur={() => setTouched(true)}
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

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNumero"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número
                </label>
                <input
                  type="text"
                  name="TxtNumero"
                  id="TxtNumero"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Txt"
                  className="block text-sm font-medium text-gray-700"
                >
                  ####
                </label>
                <input
                  type="text"
                  name="Txt"
                  id="Txt"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // onChange={onTextFieldChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTotalRecibido"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total recibido
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtTotalRecibido"
                    id="TxtTotalRecibido"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    // value={
                    //   isNaN(inputPrecioPorUnidad) ? 0 : inputPrecioPorUnidad
                    // }
                    // onChange={onTextFieldChangedPrecioPorUnidad}
                    // onBlur={() => setTouched(true)}
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

export default AgregarReporteVentaAmbulantesIndividual;