import { SidebarLayoutGerenciaCompras } from "../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

export default function ManejoDeProveedores() {
  return (
    <SidebarLayoutGerenciaCompras>
      <form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Manejo de proveedores
              </h3>
              {/* <p className="mt-1 text-sm text-gray-500">¡Hola!</p> */}
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre&#40;s&#41;
                </label>
                <input
                  type="text"
                  name="TxtNombre"
                  id="TxtNombre"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtApellidos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellidos
                </label>
                <input
                  type="text"
                  name="TxtApellidos"
                  id="TxtApellidos"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="TxtDireccion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección
                </label>
                <input
                  type="text"
                  name="TxtDireccion"
                  id="TxtDireccion"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTelefono"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="TxtTelefono"
                  id="TxtTelefono"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHorarioDeAtencion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horario de atención
                </label>
                <input
                  type="time"
                  name="TxtHorarioDeAtencion"
                  id="TxtHorarioDeAtencion"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="TxtTiposDeProductosQueSeCompran"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipos de productos que se compran
                </label>
                <select
                  id="CmbTiposDeProductosQueSeCompran"
                  name="CmbTiposDeProductosQueSeCompran"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona un producto...</option>
                  <option>Masa</option>
                  <option>Fresas</option>
                  <option>Leche</option>
                </select>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="RdbEntregasADomicilioSi"
                  className="block text-sm font-medium text-gray-700"
                >
                  Entregas a domicilio
                </label>

                <div className="mt-4 space-x-4 flex">
                  <div className="flex items-center">
                    <input
                      id="RdbEntregasADomicilioSi"
                      name="RdbEntregasADomicilio"
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
