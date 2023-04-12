import React, { FormEvent, useEffect, useState } from "react";
import { SidebarLayout } from "../components/layouts/SidebarLayout";
import { CheckCircleIcon, PhotographIcon } from "@heroicons/react/outline";
import { uploadFile } from "../firebase";

const Pruebas = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [urlFile, setUrlFile] = useState("");

  const onChangeInputFile = (newFile: File | null, newFileName: string) => {
    setFile(newFile);
    setFileName(newFileName);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await uploadFile(file, fileName);
      setUrlFile(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(urlFile);
  }, [urlFile]);

  return (
    <>
      <SidebarLayout>
        <form onSubmit={handleSubmit}>
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Selecciona un archivo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotographIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-yellow focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-yellow focus-within:ring-offset-2 hover:text-primary-yellow"
                  >
                    <span>Sube un archivo</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) =>
                        onChangeInputFile(
                          e.target.files![0],
                          e.target.files![0].name
                        )
                      }
                    />
                  </label>
                  <p className="pl-1">o solo arrastralo aquí</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  Unicamente archivos en formato PDF
                </p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-x-2 rounded-md mt-3 bg-primary-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Button text
          </button>
        </form>
      </SidebarLayout>
    </>
  );
};

export default Pruebas;
