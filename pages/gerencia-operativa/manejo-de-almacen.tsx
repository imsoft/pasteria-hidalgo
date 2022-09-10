import { SidebarLayoutGerenciaOperativa } from "../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";
import Image from "next/image";

const producto = [
  {
    nombreProducto: "Platano",
    codigoProducto: "72g397g24",
    cantidad: "33 Kg",
    unidades: "10°",
    proveedor: "Banana S.A. de C.V.",
    estado: "Suficiente",
    imagen:
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    nombreProducto: "Piña",
    codigoProducto: "34y74ndd3",
    cantidad: "30 Kg",
    unidades: "20°",
    proveedor: "Piña S.A. de C.V.",
    estado: "Suficiente",
    imagen:
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGklQzMlQjFhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    nombreProducto: "Jamón",
    codigoProducto: "930h82f0h",
    cantidad: "12 Kg",
    unidades: "22°",
    proveedor: "Jamón S.A. de C.V.",
    estado: "Suficiente",
    imagen:
      "https://images.unsplash.com/photo-1529016061486-d80ad8eea08b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1840&q=80",
  },
  {
    nombreProducto: "Queso",
    codigoProducto: "h2488fh0",
    cantidad: "12 Kg",
    unidades: "44°",
    proveedor: "Queso S.A. de C.V.",
    estado: "Mitad del producto",
    imagen:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlZXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    nombreProducto: "Queso Philadelphia",
    codigoProducto: "h08h80f0",
    cantidad: "31 Kg",
    unidades: "54°",
    proveedor: "Queso Philadelphia S.A. de C.V.",
    estado: "Agotado",
    imagen:
      "https://images.unsplash.com/photo-1442604699113-7d805614c476?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3JlYW0lMjBjaGVlc2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    nombreProducto: "Frambuesa",
    codigoProducto: "g8f28f28",
    cantidad: "10 Kg",
    unidades: "2°",
    proveedor: "Frambuesa S.A. de C.V.",
    estado: "Suficiente",
    imagen:
      "https://images.unsplash.com/photo-1540416465865-1f102746ce47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZnJhbWJ1ZXNhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    nombreProducto: "Nutella",
    codigoProducto: "pybfr3fq",
    cantidad: "41 Kg",
    unidades: "5°",
    proveedor: "Nutella S.A. de C.V.",
    estado: "Mitad del producto",
    imagen:
      "https://images.unsplash.com/photo-1519420573924-65fcd45245f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bnV0ZWxsYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    nombreProducto: "Cajeta",
    codigoProducto: "g72fgfq3gp",
    cantidad: "42 Kg",
    unidades: "4°",
    proveedor: "Cajeta S.A. de C.V.",
    estado: "Agotado",
    imagen:
      "https://images.unsplash.com/photo-1568657704598-602700bd9694?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyYW1lbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    nombreProducto: "Arroz",
    codigoProducto: "oq4fy824",
    cantidad: "42 Kg",
    unidades: "1°",
    proveedor: "Arroz S.A. de C.V.",
    estado: "Suficiente",
    imagen:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    nombreProducto: "Fresa",
    codigoProducto: "oq4fy824",
    cantidad: "13 Kg",
    unidades: "2.2°",
    proveedor: "Fresa S.A. de C.V.",
    estado: "Suficiente",
    imagen:
      "https://images.unsplash.com/photo-1554118879-e459bb1fe1ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlc2F8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
];

export default function ManejoAlmacen() {
  return (
    <SidebarLayoutGerenciaOperativa>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Manejo de Almacén
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver los productos que se encuentran en almacén.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-yellow px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-primary-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:ring-offset-2 sm:w-auto"
            >
              Agregar Producto
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Producto
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Cantidad
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Proveedor
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Editar</span>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Eliminar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {producto.map(
                      ({
                        nombreProducto,
                        codigoProducto,
                        cantidad,
                        unidades,
                        proveedor,
                        estado,
                        imagen,
                      }) => (
                        <tr key={nombreProducto}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                {/* <Image
                                  className="h-10 w-10 rounded-full"
                                  src={imagen}
                                  alt={imagen}
                                  width={10}
                                  height={10}
                                /> */}
                                <Image
                                  className="h-10 w-10 rounded-full"
                                  src={imagen}
                                  alt={imagen}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {nombreProducto}
                                </div>
                                <div className="text-gray-500">
                                  {codigoProducto}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">{cantidad}</div>
                            <div className="text-gray-500">{unidades}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100">
                              {estado}
                            </span>
                          </td>
                          {/* { estado = "Suficiente" ? "text-green-800 bg-green-100" : estado = "Mital del producto" ? "text-yellow-800 bg-yellow-100" : estado = "Agotado" && "text-red-800 bg-red-100" } */}
                          {/* inline-flex rounded-full px-2 text-xs font-semibold leading-5 */}
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {proveedor}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href="#"
                              className="text-primary-blue hover:text-indigo-900"
                            >
                              Editar
                              <span className="sr-only">
                                , {nombreProducto}
                              </span>
                            </a>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href="#"
                              className="text-red-600 hover:text-red-700"
                            >
                              Eliminar
                              <span className="sr-only">
                                , {nombreProducto}
                              </span>
                            </a>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayoutGerenciaOperativa>
  );
}
