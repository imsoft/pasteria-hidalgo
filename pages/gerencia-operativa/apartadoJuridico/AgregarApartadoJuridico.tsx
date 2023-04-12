import {
  ChangeEvent,
  FormEvent,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/router";

import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import { ApartadosJuridicosContext } from "../../../context/gerencia-operativa/apartadoJuridico/ApartadosJuridicosContext";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";
import { DocumentTextIcon } from "@heroicons/react/outline";
import { uploadFile } from "../../../firebase";

const ApartadoJuridico = () => {
  const { agregarNuevoApartadoJuridico } = useContext(
    ApartadosJuridicosContext
  );

  const { sucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const router = useRouter();

  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState("");
  const [inputNombreSucursalOFranquicia, setInputNombreSucursalOFranquicia] =
    useState("");
  const [file, setFile] = useState<File | null>(null);
  const [inputNombreDelArchivo, setInputNombreDelArchivo] = useState("");
  const [inputUrlDelArchivo, setInputUrlDelArchivo] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedNombreSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputNombreSucursalOFranquicia(event.target.value);
  };

  const onTextFieldChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const onFileFieldChangedFile = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
    setInputNombreDelArchivo(event.target.files![0].name);
  };

  const onTextFieldChangedUrlDelArchivo = (url: string) => {
    setInputUrlDelArchivo(url);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await uploadFile(file, inputNombreDelArchivo);
      onTextFieldChangedUrlDelArchivo(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSave();
  }, [inputUrlDelArchivo]);

  const onSave = () => {
    if (
      inputSucursalOFranquicia.length === 0 &&
      inputNombreSucursalOFranquicia.length === 0 &&
      inputNombreDelArchivo.length === 0 &&
      inputUrlDelArchivo.length === 0
    )
      return;

    agregarNuevoApartadoJuridico(
      inputSucursalOFranquicia,
      inputNombreSucursalOFranquicia,
      inputNombreDelArchivo,
      inputUrlDelArchivo,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Candidato Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    router.push("/gerencia-operativa/apartadoJuridico/VerApartadoJuridico");

    setTouched(false);
    setInputSucursalOFranquicia("");
    setInputNombreSucursalOFranquicia("");
    setInputNombreDelArchivo("");
    setInputUrlDelArchivo("");
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form onSubmit={handleSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Apartado Juridico
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  ¿Sucursal o Franquicia?
                </label>

                <div className="col-span-6 sm:col-span-3">
                  <select
                    id="CmbNombre"
                    name="CmbNombre"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                    defaultValue="Selecciona un producto..."
                    onChange={onTextFieldChangedSucursalOFranquicia}
                    onBlur={() => setTouched(true)}
                  >
                    <option hidden>Seleccione una opción...</option>
                    <option>Sucursal</option>
                    <option>Franquicia</option>
                  </select>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  {inputSucursalOFranquicia === "Sucursal"
                    ? "Sucursal"
                    : inputSucursalOFranquicia === "Franquicia"
                    ? "Franquicia"
                    : "Primero seleccione si es franquicia o sucursal"}
                </label>
                <select
                  id="CmbFranquicia"
                  name="CmbFranquicia"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedNombreSucursalOFranquicia}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>
                    Seleccione la{" "}
                    {inputSucursalOFranquicia === "Sucursal"
                      ? "Sucursal"
                      : inputSucursalOFranquicia === "Franquicia"
                      ? "Franquicia"
                      : "Primero seleccione si es franquicia o sucursal"}
                    ...
                  </option>
                  {sucursalesYFranquiciasMemo
                    .filter(
                      (sucursalesYFranquicias) =>
                        sucursalesYFranquicias.sucursalOFranquicia ===
                        inputSucursalOFranquicia
                    )
                    .map((sucursalesYFranquicias) => (
                      <option
                        key={sucursalesYFranquicias.nombreSucursalOFranquicia}
                      >
                        {sucursalesYFranquicias.nombreSucursalOFranquicia}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Selecciona un archivo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <DocumentTextIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm justify-center leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-yellow focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-yellow focus-within:ring-offset-2 hover:text-primary-yellow"
                      >
                        <span>Sube un archivo</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="application/pdf"
                          className="sr-only"
                          onChange={onFileFieldChangedFile}
                        />
                      </label>
                      {/* <p className="pl-1">o solo arrastralo aquí</p> */}
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      Unicamente archivos en formato PDF
                    </p>
                    <p className="text-sm mt-5 leading-5 text-gray-600">
                      {inputNombreDelArchivo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              // onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayoutGerenciaOperativa>
  );
};

export default ApartadoJuridico;
