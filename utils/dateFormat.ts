export const cambiarFormatoFecha = (fechaOriginal: string): string => {
  if (fechaOriginal.includes("/")) {
    return fechaOriginal;
  }

  const partesFecha = fechaOriginal.split("-");
  const año = partesFecha[0];
  const mes = partesFecha[1];
  const día = partesFecha[2];

  const fechaNueva = `${día}/${mes}/${año}`;

  return fechaNueva;
};
