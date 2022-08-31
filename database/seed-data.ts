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
      puesto: "Presidente",
      descripcionDelPuesto: "Presidente",
      fechaDeNacimiento: "2020-01-01",
      domicilio: "Calle falsa 123",
      curp: "ABC123",
      noImss: "123456789",
      noCartaDePolicia: "123456789",
    },
    {
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
      nombre: "Gabriel",
      puesto: "Tesorero",
      descripcionDelPuesto: "Tesorero",
      fechaDeNacimiento: "2020-01-01",
      domicilio: "Calle falsa 123",
      curp: "ABC123",
      noImss: "123456789",
      noCartaDePolicia: "123456789",
    },
  ],
};
