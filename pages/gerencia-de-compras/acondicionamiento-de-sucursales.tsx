import { SidebarLayoutGerenciaCompras } from "../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

export default function AcondicionamientoDeSucursales() {
  return (
    <SidebarLayoutGerenciaCompras>
      <form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Acondicionamiento de sucursales
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Productos
                </label>
                <select
                  id="TxtProductos"
                  name="TxtProductos"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
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
                  htmlFor="TxtFechaCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de compra
                </label>
                <input
                  type="Date"
                  name="TxtFechaCompra"
                  id="TxtFechaCompra"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción del producto
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio de la compra
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
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

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaEstimadaDeEntrega"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha estimada de entrega
                </label>
                <input
                  type="Date"
                  name="TxtFechaEstimadaDeEntrega"
                  id="TxtFechaEstimadaDeEntrega"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProveedor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Proveedor
                </label>
                <select
                  id="TxtProveedor"
                  name="TxtProveedor"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona un proveedor...</option>
                  <option>Juan</option>
                  <option>Pedro</option>
                  <option>Luis</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFactura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Factura
                </label>

                <div className="mt-4 space-x-4 flex">
                  <div className="flex items-center">
                    <input
                      id="TxtFactura"
                      name="TxtFactura"
                      type="radio"
                      className="focus:ring-primary-yellow h-4 w-4 text-primary-yellow border-gray-300"
                    />
                    <label htmlFor="RdbEntregasADomicilioSi" className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">
                        Sí
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="RdbEntregasADomicilioNo"
                      name="RdbEntregasADomicilio"
                      type="radio"
                      className="focus:ring-primary-yellow h-4 w-4 text-primary-yellow border-gray-300"
                    />
                    <label htmlFor="RdbEntregasADomicilioNo" className="ml-3">
                      <span className="block text-sm font-medium text-gray-700">
                        No
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTotalAcumulado"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ver total acumulado
                </label>
                <input
                  type="text"
                  name="TxtTotalAcumulado"
                  id="TxtTotalAcumulado"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayoutGerenciaCompras>
  );
}
