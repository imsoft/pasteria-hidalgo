export const phoneNumberFormat = (telefono: string): string =>{
  const firstPart = telefono.slice(0, 2);
  const secondPart = telefono.slice(2, 6);
  const thirdPart = telefono.slice(6, 10);
  const telefonoSeparado = `${firstPart} - ${secondPart} - ${thirdPart}`;
  return telefonoSeparado;
}
