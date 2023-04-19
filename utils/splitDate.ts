// export const dividirFecha = (fecha: string): [string, string, string] => {
//   const [diaStr, mesStr, anioStr] = fecha.split("-");
//   const dia = diaStr;
//   const mes = [
//     "Enero",
//     "Febrero",
//     "Marzo",
//     "Abril",
//     "Mayo",
//     "Junio",
//     "Julio",
//     "Agosto",
//     "Septiembre",
//     "Octubre",
//     "Noviembre",
//     "Diciembre",
//   ][parseInt(mesStr, 10) - 1];
//   const anio = anioStr;
//   return [anio, mes, dia];
// };

export const dividirFecha = (fecha: string): [string, string, string] => {
  const regex = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/;
  const match = fecha.match(regex);

  if (!match) {
    throw new Error("Formato de fecha no válido");
  }

  const [anioStr, mesStr, diaStr] = match.slice(1);

  const dia = diaStr;

  const mes = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ][parseInt(mesStr, 10) - 1];

  const anio = anioStr;

  return [anio, mes, dia];
};
