import { Candidato } from '../../../interfaces/candidato';

const candidatos: Candidato[] = [
  {
    _id: '1',
    nombre: "Juan",
    puesto: "Presidente",
    descripcionDelPuesto: "Presidente",
    fechaDeNacimiento: "2020-01-01",
    domicilio: "Calle falsa 123",
    curp: "ABC123",
    noImss: "123456789",
    noCartaDePolicia: "123456789",
  },
  {
    _id: '2',
    nombre: "Pedro",
    puesto: "Secretario",
    descripcionDelPuesto: "Secretario",
    fechaDeNacimiento: "2020-01-01",
    domicilio: "Calle falsa 123",
    curp: "ABC123",
    noImss: "123456789",
    noCartaDePolicia: "123456789",
  },
  {
    _id: '3',
    nombre: "Gabriel",
    puesto: "Tesorero",
    descripcionDelPuesto: "Tesorero",
    fechaDeNacimiento: "2020-01-01",
    domicilio: "Calle falsa 123",
    curp: "ABC123",
    noImss: "123456789",
    noCartaDePolicia: "123456789",
  },
];

const ListaCandidatos = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Candidatos
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver los candidatos para la empresa.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-yellow px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-primary-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:ring-offset-2 sm:w-auto"
            >
              Agregar Candidato
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
                        Candidato
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
                    {candidatos.map(
                      ({
                        nombre,
                        puesto,
                        descripcionDelPuesto,
                        fechaDeNacimiento,
                        domicilio,
                        curp,
                        noImss,
                        noCartaDePolicia,
                      }) => (
                        <tr key={nombre}>
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
                                {/* <img
                                  className="h-10 w-10 rounded-full"
                                  src={imagen}
                                  alt={imagen}
                                /> */}
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {nombre}
                                </div>
                                <div className="text-gray-500">
                                  {puesto}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">{descripcionDelPuesto}</div>
                            <div className="text-gray-500">{fechaDeNacimiento}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100">
                              {domicilio}
                            </span>
                          </td>
                          {/* { estado = "Suficiente" ? "text-green-800 bg-green-100" : estado = "Mital del producto" ? "text-yellow-800 bg-yellow-100" : estado = "Agotado" && "text-red-800 bg-red-100" } */}
                          {/* inline-flex rounded-full px-2 text-xs font-semibold leading-5 */}
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {curp}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href="#"
                              className="text-primary-blue hover:text-indigo-900"
                            >
                              Editar
                              <span className="sr-only">
                                , {noImss}
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
                                , {noCartaDePolicia}
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
  )
}

export default ListaCandidatos;