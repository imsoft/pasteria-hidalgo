import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const PruebasNotificacion = () => {
  const onSave = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Candidato Agregado",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const onDelete = () => {
    Swal.fire({
      title: "¿Quieres eliminar a este candidato?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Candidato Eliminado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const onUpdate = () => {
    Swal.fire({
      title: "¿Quieres actualizar la información a este candidato?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Candidato Actualizado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const MySwal = withReactContent(Swal);

  MySwal.fire({
    position: "top-end",
    icon: "success",
    title: "Candidato Agregado",
    showConfirmButton: false,
    timer: 1000,
  });

  return (
    <>
      <button
        type="submit"
        className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
        onClick={onSave}
      >
        Guardar - Normal
      </button>

      <button
        type="submit"
        className="mx-2 bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
        onClick={onDelete}
      >
        Yes / No - Normal
      </button>

      <button
        type="submit"
        className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
        onClick={onUpdate}
      >
        Actualizar - Normal
      </button>

      <button
        type="submit"
        className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
        onClick={onSave}
      >
        Guardar - React
      </button>

      <button
        type="submit"
        className="mx-2 bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
        onClick={onDelete}
      >
        Yes / No - React
      </button>

      <button
        type="submit"
        className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
        onClick={onUpdate}
      >
        Actualizar - React
      </button>
    </>
  );
};

export default PruebasNotificacion;
