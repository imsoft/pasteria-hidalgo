import { FC } from "react";
import router from "next/router";
import { ApartadoJuridico } from "../../../interfaces";
import Link from "next/link";

interface Props {
  apartadoJuridico: ApartadoJuridico;
}

const ListaApartadosJuridicos: FC<Props> = ({ apartadoJuridico }) => {
  const onClick = () => {
    router.push(`/gerencia-operativa/apartadoJuridico/${apartadoJuridico._id}`);
  };

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Detener la propagación del evento
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={apartadoJuridico._id}
        onClick={onClick}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {apartadoJuridico.sucursalOFranquicia}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {apartadoJuridico.nombreSucursalOFranquicia || "-"}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {apartadoJuridico.nombreDelArchivo}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="flex items-center font-medium text-gray-900">
            <Link href={`${apartadoJuridico.urlDelArchivo}`}>
              <a target="_blank">
                <button
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-primary-yellow px-2.5 py-1.5 text-sm font-semibold text-primary-blue shadow-sm hover:bg-primary-blue hover:text-primary-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                  onClick={onButtonClick}
                >
                  Ver documento
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-1 w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </button>
              </a>
            </Link>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaApartadosJuridicos;
