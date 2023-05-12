// export const cambiarFormatoFecha = (fechaOriginal: string): string => {
//   if (fechaOriginal.includes("/")) {
//     return fechaOriginal;
//   }

//   const partesFecha = fechaOriginal.split("-");
//   const año = partesFecha[0];
//   const mes = partesFecha[1];
//   const día = partesFecha[2];

//   const fechaNueva = `${día}/${mes}/${año}`;

//   return fechaNueva;
// };

export const cambiarFormatoFecha = (fecha: string): string => {
  let dia: string;
  let mes: string;
  let anio: string;

  if (fecha.includes("-")) {
    // Formato yyyy-mm-dd
    const partes = fecha.split("-");
    dia = partes[2];
    mes = partes[1];
    anio = partes[0];
  } else {
    // Formato dd/mm/yyyy
    const partes = fecha.split("/");
    dia = partes[0];
    mes = partes[1];
    anio = partes[2];
  }

  if (parseInt(dia) < 10) {
    dia = dia.padStart(2, "0");
  }

  if (parseInt(mes) < 10) {
    mes = mes.padStart(2, "0");
  }

  return `${dia}/${mes}/${anio}`;
}
