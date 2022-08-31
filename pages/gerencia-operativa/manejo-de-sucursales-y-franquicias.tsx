import { SidebarLayoutGerenciaOperativa } from '../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa';

export default function ManejoSucursalesFranquicias() {
  return (
    <SidebarLayoutGerenciaOperativa>
      <form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
              Manejo de Sucursales y Franquicias
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>

            <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFactura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Seleccione una opción
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
                        Franquicia
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
                        Sucursal
                      </span>
                    </label>
                  </div>
                </div>
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
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección
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
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Distancia de la fabrica a la sucursal o franquicia
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
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
      
    </SidebarLayoutGerenciaOperativa>
  );
}
