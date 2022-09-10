interface SeedData {
  candidatos: SeedCandidatos[];
}

interface SeedCandidatos {
  nombre: string;
  puesto: string;
  descripcionDelPuesto: string;
  fechaDeNacimiento: string;
  domicilio: string;
  curp: string;
  noImss: string;
  noCartaDePolicia: string;
}

export const seedDataCandidatos: SeedData = {
  candidatos: [
    {
      nombre: "Juan",
      puesto: "Administrador",
      descripcionDelPuesto: "Presidente",
      fechaDeNacimiento: "16/09/2022",
      domicilio: "Calle falsa 123",
      curp: "ABC123",
      noImss: "123456789",
      noCartaDePolicia: "123456789",
    },
    {
      nombre: "Pedro",
      puesto: "Chef",
      descripcionDelPuesto: "Secretario",
      fechaDeNacimiento: "17/08/2022",
      domicilio: "Calle falsa 123",
      curp: "ABC123",
      noImss: "123456789",
      noCartaDePolicia: "123456789",
    },
    {
      nombre: "Gabriel",
      puesto: "Operador",
      descripcionDelPuesto: "Tesorero",
      fechaDeNacimiento: "15/10/2022",
      domicilio: "Calle falsa 123",
      curp: "ABC123",
      noImss: "123456789",
      noCartaDePolicia: "123456789",
    },
  ],
};
