import {
  IListadoDeReporteDeCompra,
  PuestosEmpresa,
  YesNo,
} from "../interfaces";

interface SeedCandidato {
  nombre: string;
  puesto: PuestosEmpresa;
  descripcionDelPuesto: string;
  fechaDeNacimiento: string;
  domicilio: string;
  curp: string;
  noImss?: string;
  noCartaDePolicia: string;
  celular: string;
  contactoDeEmergencia: string;
  correoElectronico: string;
  referencia1Nombre: string;
  referencia1Empresa: string;
  referencia1NumeroTelefonico: string;
  referencia1Observaciones: string;
  referencia2Nombre: string;
  referencia2Empresa: string;
  referencia2NumeroTelefonico: string;
  referencia2Observaciones: string;
  referencia3Nombre?: string;
  referencia3Empresa?: string;
  referencia3NumeroTelefonico?: string;
  referencia3Observaciones?: string;
}

interface SeedPersonalActivo {
  nombre: string;
  puesto: PuestosEmpresa;
  fechaDeContratacion: string;
  noContrato: string;
  noExpediente: string;
  bajaTemporal: string;
  comentarios: string;
}

interface SeedCheckInPersonal {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  nombre: string;
  fecha: string;
  horaDeIngreso: string;
  horaDeSalida: string;
}

interface SeedAcondicionamientoDeSucursal {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  producto: string;
  fechaDeCompra: string;
  descripcionDelProducto: string;
  fechaEstimadaDeEntrega: string;
  proveedor: string;
  factura: YesNo;
  precioDeCompra: number;
  cantidad: number;
  totalAcomulado: number;
}

interface SeedProveedor {
  nombre: string;
  direccion: string;
  telefono: string;
  horarioDeApertura: string;
  horarioDeCierre: string;
  productosQueSeCompran: string;
  entregasADomicilio: string;
  rfc: string;
}

interface SeedReporteDeCompra {
  fechaDeCompra: string;
  nombreProveedor: string;
  credito: string;
  factura: string;
  listadoDeReporteDeCompra: IListadoDeReporteDeCompra[];
  precioTotalDelCompra: number;
}

interface SeedAsignarPrecio {
  producto: string;
  precioMaximo: string;
}

interface SeedClienteFrecuente {
  nombre: string;
  correoElectronico: string;
  fechaDeNacimiento: string;
  puntosDeCompra: number;
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
}

interface SeedData {
  candidatos: SeedCandidato[];
  personalActivo: SeedPersonalActivo[];
  checkInDePersonal: SeedCheckInPersonal[];
  acondicionamientoDeSucursal: SeedAcondicionamientoDeSucursal[];
  proveedor: SeedProveedor[];
  reporteDeCompra: SeedReporteDeCompra[];
  asignarPrecio: SeedAsignarPrecio[];
  clienteFrecuente: SeedClienteFrecuente[];
}

export const initialData: SeedData = {
  candidatos: [
    {
      // 1
      nombre: "Brandon Uriel Garcia Ramos",
      puesto: "Administrador",
      descripcionDelPuesto: "Checar funciones de la aplicación web",
      fechaDeNacimiento: "1997-03-15",
      domicilio: "Cipriano Campos Alatorre #752 interior #104",
      curp: "garb970315hjcrmr01",
      noImss: "24681012",
      noCartaDePolicia: "123456789",
      celular: "3334109866",
      contactoDeEmergencia: "3339693868",
      correoElectronico: "bugr.2487@gmail.com",
      referencia1Nombre: "Yeltza",
      referencia1Empresa: "Infinito Aduanero",
      referencia1NumeroTelefonico: "3339693868",
      referencia1Observaciones: "Muy buen trabajador",
      referencia2Nombre: "Javier",
      referencia2Empresa: "Abogado SA de CV",
      referencia2NumeroTelefonico: "3331717277",
      referencia2Observaciones: "Muy inteligente, pero un poco impuntual",
      referencia3Nombre: "Happy",
      referencia3Empresa: "Aviantor",
      referencia3NumeroTelefonico: "33323253487",
      referencia3Observaciones: "Gran elemento para trabajar en equipo",
    },
    {
      // 2
      nombre: "Juan Perez",
      puesto: "Contaduria",
      descripcionDelPuesto: "Programación en JavaScript",
      fechaDeNacimiento: "1995-05-20",
      domicilio: "Av. Principal #123",
      curp: "peju950520hjcrmr02",
      noImss: "13579246",
      noCartaDePolicia: "987654321",
      celular: "3335556666",
      contactoDeEmergencia: "3331112222",
      correoElectronico: "juanperez@gmail.com",
      referencia1Nombre: "Ana",
      referencia1Empresa: "IT Solutions",
      referencia1NumeroTelefonico: "3334445555",
      referencia1Observaciones: "Muy eficiente",
      referencia2Nombre: "Pedro",
      referencia2Empresa: "TechCorp",
      referencia2NumeroTelefonico: "3338889999",
      referencia2Observaciones: "Buen compañero de trabajo",
      referencia3Nombre: "Luis",
      referencia3Empresa: "GlobalSoft",
      referencia3NumeroTelefonico: "3332223333",
      referencia3Observaciones: "Muy colaborador",
    },
    {
      // 3
      nombre: "María González",
      puesto: "Gerencia de compras",
      descripcionDelPuesto: "Estrategias de redes sociales",
      fechaDeNacimiento: "1989-03-12",
      domicilio: "Calle del Parque #456",
      curp: "GOMM890312MVZLSR08",
      noImss: "24681357",
      noCartaDePolicia: "123456789",
      celular: "4447778888",
      contactoDeEmergencia: "4442221111",
      correoElectronico: "mariagonzalez@gmail.com",
      referencia1Nombre: "Carlos",
      referencia1Empresa: "Agencia de Publicidad",
      referencia1NumeroTelefonico: "4445556666",
      referencia1Observaciones: "Excelente creatividad",
      referencia2Nombre: "Sofía",
      referencia2Empresa: "Compañía de Cosméticos",
      referencia2NumeroTelefonico: "4449998888",
      referencia2Observaciones: "Gran capacidad de liderazgo",
      referencia3Nombre: "Javier",
      referencia3Empresa: "Empresa de Tecnología",
      referencia3NumeroTelefonico: "4443332222",
      referencia3Observaciones: "Muy detallista en su trabajo",
    },
    {
      // 4
      nombre: "Luisa Rodríguez",
      puesto: "Recursos Humanos",
      descripcionDelPuesto: "Administración de personal",
      fechaDeNacimiento: "1992-11-04",
      domicilio: "Avenida del Bosque #789",
      curp: "RORL921104MNTSDS01",
      noImss: "36985214",
      noCartaDePolicia: "987654321",
      celular: "5558889999",
      contactoDeEmergencia: "5553332222",
      correoElectronico: "luisarodriguez@gmail.com",
      referencia1Nombre: "Alejandro",
      referencia1Empresa: "Empresa de Consultoría",
      referencia1NumeroTelefonico: "5557778888",
      referencia1Observaciones: "Gran capacidad de resolución de problemas",
      referencia2Nombre: "Fernanda",
      referencia2Empresa: "Compañía de Seguros",
      referencia2NumeroTelefonico: "5551112222",
      referencia2Observaciones: "Muy proactiva y comprometida",
      referencia3Nombre: "Arturo",
      referencia3Empresa: "Empresa de Construcción",
      referencia3NumeroTelefonico: "5554443333",
      referencia3Observaciones: "Excelente trabajo en equipo",
    },
    {
      // 5
      nombre: "Diego López",
      puesto: "Gerencia de ventas",
      descripcionDelPuesto: "Desarrollo de aplicaciones en React",
      fechaDeNacimiento: "1991-08-07",
      domicilio: "Calle de la Rosa #345",
      curp: "LOPD910807HMCRGR06",
      noImss: "12345678",
      noCartaDePolicia: "87654321",
      celular: "2223334444",
      contactoDeEmergencia: "2225556666",
      correoElectronico: "diegolopez@gmail.com",
      referencia1Nombre: "Mónica",
      referencia1Empresa: "Empresa de Desarrollo de Software",
      referencia1NumeroTelefonico: "2224445555",
      referencia1Observaciones: "Muy puntual y organizado",
      referencia2Nombre: "Jorge",
      referencia2Empresa: "Empresa de Consultoría en TI",
      referencia2NumeroTelefonico: "2227778888",
      referencia2Observaciones: "Excelente trabajo en equipo",
      referencia3Nombre: "Laura",
      referencia3Empresa: "Empresa de Diseño Gráfico",
      referencia3NumeroTelefonico: "2221112222",
      referencia3Observaciones: "Muy creativo en el diseño de interfaces",
    },
    {
      // 6
      nombre: "Sofía Ramírez",
      puesto: "Gerencia operativa",
      descripcionDelPuesto: "Litigio mercantil",
      fechaDeNacimiento: "1985-02-23",
      domicilio: "Calle de la Palma #678",
      curp: "RASM850223MVZMSF08",
      noImss: "24680135",
      noCartaDePolicia: "987654321",
      celular: "6669998888",
      contactoDeEmergencia: "6662221111",
      correoElectronico: "sofiaramirez@gmail.com",
      referencia1Nombre: "Pedro",
      referencia1Empresa: "Bufete de Abogados",
      referencia1NumeroTelefonico: "6665554444",
      referencia1Observaciones: "Muy buena capacidad de argumentación",
      referencia2Nombre: "Isabel",
      referencia2Empresa: "Empresa de Bienes Raíces",
      referencia2NumeroTelefonico: "6667778888",
      referencia2Observaciones:
        "Gran capacidad para solucionar problemas legales",
      referencia3Nombre: "Javier",
      referencia3Empresa: "Empresa de Seguridad",
      referencia3NumeroTelefonico: "6663332222",
      referencia3Observaciones: "Excelente en la gestión de documentos legales",
    },
    {
      // 7
      nombre: "María Fernández",
      puesto: "Administrador",
      descripcionDelPuesto: "Desarrollo de software en Java",
      fechaDeNacimiento: "1990-10-15",
      domicilio: "Av. de los Pinos #456",
      curp: "FEAM901015MVZRRR01",
      noImss: "35715926",
      noCartaDePolicia: "111222333",
      celular: "5557778888",
      contactoDeEmergencia: "5554443333",
      correoElectronico: "mariafernandez@gmail.com",
      referencia1Nombre: "Juan",
      referencia1Empresa: "Empresa de Desarrollo de Software",
      referencia1NumeroTelefonico: "5552221111",
      referencia1Observaciones: "Muy responsable y proactivo",
      referencia2Nombre: "Carla",
      referencia2Empresa: "Empresa de Consultoría en TI",
      referencia2NumeroTelefonico: "5553334444",
      referencia2Observaciones: "Excelente liderazgo y gestión de equipos",
      referencia3Nombre: "Pedro",
      referencia3Empresa: "Empresa de Automatización Industrial",
      referencia3NumeroTelefonico: "5556667777",
      referencia3Observaciones:
        "Muy hábil en la implementación de soluciones tecnológicas",
    },
    {
      // 8
      nombre: "Luisa Torres",
      puesto: "Recursos Humanos",
      descripcionDelPuesto: "Atención clínica a pacientes",
      fechaDeNacimiento: "1987-03-12",
      domicilio: "Calle del Sol #789",
      curp: "TOTL870312MVZRRR03",
      noImss: "46801325",
      noCartaDePolicia: "456789012",
      celular: "7773332222",
      contactoDeEmergencia: "7775554444",
      correoElectronico: "luisatorres@gmail.com",
      referencia1Nombre: "Ana",
      referencia1Empresa: "Clínica de Psicoterapia",
      referencia1NumeroTelefonico: "7774445555",
      referencia1Observaciones: "Muy comprometida con su trabajo",
      referencia2Nombre: "Jorge",
      referencia2Empresa: "Centro de Rehabilitación",
      referencia2NumeroTelefonico: "7776667777",
      referencia2Observaciones: "Gran capacidad de empatía y comprensión",
      referencia3Nombre: "Mónica",
      referencia3Empresa: "Centro de Investigación en Salud Mental",
      referencia3NumeroTelefonico: "7778889999",
      referencia3Observaciones:
        "Excelente en la investigación y análisis de casos clínicos",
    },
    {
      // 9
      nombre: "Pedro García",
      puesto: "Gerencia de ventas",
      descripcionDelPuesto:
        "Asesoría y representación legal en derecho corporativo",
      fechaDeNacimiento: "1985-07-01",
      domicilio: "Calle de la Paz #321",
      curp: "GAPD850701HDFRRR02",
      noImss: "24681357",
      noCartaDePolicia: "987654321",
      celular: "5551112222",
      contactoDeEmergencia: "5556667777",
      correoElectronico: "pedrogarcia@gmail.com",
      referencia1Nombre: "María",
      referencia1Empresa: "Bufete de Abogados",
      referencia1NumeroTelefonico: "5553334444",
      referencia1Observaciones: "Excelente habilidad de negociación",
      referencia2Nombre: "José",
      referencia2Empresa: "Departamento Legal de Empresa de Telecomunicaciones",
      referencia2NumeroTelefonico: "5552221111",
      referencia2Observaciones:
        "Gran conocimiento en derecho de telecomunicaciones",
      referencia3Nombre: "Luis",
      referencia3Empresa: "Notaría Pública",
      referencia3NumeroTelefonico: "5557778888",
      referencia3Observaciones:
        "Muy preciso y detallista en la revisión de documentos legales",
    },
    {
      // 10
      nombre: "Carmen Méndez",
      puesto: "Gerencia operativa",
      descripcionDelPuesto: "Atención clínica y tratamiento de pacientes",
      fechaDeNacimiento: "1992-02-25",
      domicilio: "Calle de las Flores #567",
      curp: "MEMC920225MDFRRR06",
      noImss: "13579024",
      noCartaDePolicia: "123456789",
      celular: "7774445555",
      contactoDeEmergencia: "7771112222",
      correoElectronico: "carmenmendez@gmail.com",
      referencia1Nombre: "Juan",
      referencia1Empresa: "Centro de Salud",
      referencia1NumeroTelefonico: "7772223333",
      referencia1Observaciones:
        "Gran dedicación y compromiso con sus pacientes",
      referencia2Nombre: "María",
      referencia2Empresa: "Clínica de Especialidades Médicas",
      referencia2NumeroTelefonico: "7775556666",
      referencia2Observaciones:
        "Muy hábil en el diagnóstico y tratamiento de enfermedades crónicas",
      referencia3Nombre: "Jorge",
      referencia3Empresa: "Hospital General",
      referencia3NumeroTelefonico: "7778889999",
      referencia3Observaciones:
        "Excelente coordinación y liderazgo en equipos médicos multidisciplinarios",
    },
  ],
  personalActivo: [
    {
      // 1, relacionado con candidato #9
      nombre: "Pedro García",
      puesto: "Gerencia de ventas",
      fechaDeContratacion: "2021-06-01",
      noContrato: "20210601",
      noExpediente: "MFS20210601",
      bajaTemporal: "No",
      comentarios: "Excelente desempeño y habilidades de liderazgo.",
    },
    {
      // 2, relacionado con candidato #8
      nombre: "Luisa Torres",
      puesto: "Recursos Humanos",
      fechaDeContratacion: "2023-01-15",
      noContrato: "JLGP20230115",
      noExpediente: "20230115",
      bajaTemporal: "No",
      comentarios:
        "Posee amplios conocimientos en programación y bases de datos.",
    },
    {
      // 3, relacionado con candidato #2
      nombre: "Juan Perez",
      puesto: "Contaduria",
      fechaDeContratacion: "2022-09-10",
      noContrato: "AKHG20220910",
      noExpediente: "20220910",
      bajaTemporal: "Si",
      comentarios: "Licencia temporal por maternidad.",
    },
    {
      // 4, relacionado con candidato #7
      nombre: "María Fernández",
      puesto: "Administrador",
      fechaDeContratacion: "2020-03-01",
      noContrato: "RP20200301",
      noExpediente: "20200301",
      bajaTemporal: "No",
      comentarios:
        "Excelente manejo de la contabilidad y finanzas de la empresa.",
    },
    {
      // 5, relacionado con candidato #5
      nombre: "Diego López",
      puesto: "Gerencia de ventas",
      fechaDeContratacion: "2021-11-10",
      noContrato: "SLG20211110",
      noExpediente: "20211110",
      bajaTemporal: "Si",
      comentarios: "Licencia temporal por enfermedad.",
    },
    {
      // 6, relacionado con candidato #4
      nombre: "Luisa Rodríguez",
      puesto: "Recursos Humanos",
      fechaDeContratacion: "2022-05-20",
      noContrato: "JCTH20220520",
      noExpediente: "20220520",
      bajaTemporal: "No",
      comentarios:
        "Responsable de la supervisión y ejecución de proyectos de construcción.",
    },
  ],
  checkInDePersonal: [
    {
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Galerías",
      nombre: "Pedro García",
      fecha: "2023-07-15",
      horaDeIngreso: "09:30",
      horaDeSalida: "18:00",
    },
    {
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Zapopan",
      nombre: "Luisa Torres",
      fecha: "2023-04-20",
      horaDeIngreso: "08:00",
      horaDeSalida: "17:00",
    },
    {
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Plaza del Sol",
      nombre: "Juan Perez",
      fecha: "2023-10-10",
      horaDeIngreso: "11:00",
      horaDeSalida: "20:00",
    },
    {
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Tlaquepaque",
      nombre: "María Fernández",
      fecha: "2023-05-05",
      horaDeIngreso: "07:00",
      horaDeSalida: "16:00",
    },
    {
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Andares",
      nombre: "Diego López",
      fecha: "2023-11-20",
      horaDeIngreso: "10:00",
      horaDeSalida: "19:00",
    },
    {
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Centro",
      nombre: "Luisa Rodríguez",
      fecha: "2023-06-15",
      horaDeIngreso: "13:00",
      horaDeSalida: "21:00",
    },
  ],
  acondicionamientoDeSucursal: [
    {
      // 1
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Polanco",
      producto: "Sillones",
      fechaDeCompra: "2023-02-15",
      descripcionDelProducto: "Material de gamuza",
      precioDeCompra: 30,
      fechaEstimadaDeEntrega: "2023-02-18",
      proveedor: "Frutas y Verduras S.A.",
      factura: "No",
      totalAcomulado: 90,
      cantidad: 3,
    },
    {
      // 2
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Reforma",
      producto: "Sillas",
      fechaDeCompra: "2023-03-10",
      descripcionDelProducto: "Sillas ergonomias",
      precioDeCompra: 250,
      fechaEstimadaDeEntrega: "2023-03-18",
      proveedor: "Tienda de Ropa Fashion",
      factura: "Si",
      totalAcomulado: 500,
      cantidad: 2,
    },
    {
      // 3
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Centro",
      producto: "Computadora portátil",
      fechaDeCompra: "2023-04-01",
      descripcionDelProducto: "Laptop Dell Inspiron 15",
      precioDeCompra: 1200,
      fechaEstimadaDeEntrega: "2023-04-05",
      proveedor: "Tecnología Total",
      factura: "Si",
      totalAcomulado: 1200,
      cantidad: 1,
    },
    {
      // 4
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Providencia",
      producto: "Papel de baño",
      fechaDeCompra: "2023-03-20",
      descripcionDelProducto: "Marca charmin",
      precioDeCompra: 15,
      fechaEstimadaDeEntrega: "2023-03-22",
      proveedor: "Ropa Cool S.A.",
      factura: "No",
      totalAcomulado: 45,
      cantidad: 3,
    },
    {
      // 5
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Polanco",
      producto: "Teléfono móvil",
      fechaDeCompra: "2023-03-15",
      descripcionDelProducto: "Smartphone Samsung Galaxy S21",
      precioDeCompra: 900,
      fechaEstimadaDeEntrega: "2023-03-20",
      proveedor: "ElectroTech",
      factura: "Si",
      totalAcomulado: 1800,
      cantidad: 2,
    },
    {
      // 6
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Providencia",
      producto: "Mesa de comedor",
      fechaDeCompra: "2023-02-28",
      descripcionDelProducto: "Mesa de madera maciza para 8 personas",
      precioDeCompra: 1200,
      fechaEstimadaDeEntrega: "2023-03-10",
      proveedor: "Muebles Elegantes",
      factura: "No",
      totalAcomulado: 1200,
      cantidad: 1,
    },
    {
      // 7
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Santa Fe",
      producto: "Laptop",
      fechaDeCompra: "2023-04-01",
      descripcionDelProducto: "Laptop HP Spectre x360",
      precioDeCompra: 1500,
      fechaEstimadaDeEntrega: "2023-04-07",
      proveedor: "Tecnología Avanzada",
      factura: "Si",
      totalAcomulado: 1500,
      cantidad: 1,
    },
    {
      // 8
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Polanco",
      producto: "Delantales",
      fechaDeCompra: "2023-03-20",
      descripcionDelProducto: "Color blanco",
      precioDeCompra: 80,
      fechaEstimadaDeEntrega: "2023-03-25",
      proveedor: "Deportes Max",
      factura: "No",
      totalAcomulado: 240,
      cantidad: 3,
    },
    {
      // 9
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Centro Histórico",
      producto: "Smartphone",
      fechaDeCompra: "2023-04-02",
      descripcionDelProducto: "Samsung Galaxy S21",
      precioDeCompra: 1000,
      fechaEstimadaDeEntrega: "2023-04-05",
      proveedor: "ElectroTech",
      factura: "Si",
      totalAcomulado: 2000,
      cantidad: 2,
    },
    {
      // 10
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Providencia",
      producto: "Libro",
      fechaDeCompra: "2023-03-28",
      descripcionDelProducto: "El Principito",
      precioDeCompra: 10,
      fechaEstimadaDeEntrega: "2023-04-01",
      proveedor: "Librería El Sabio",
      factura: "No",
      totalAcomulado: 20,
      cantidad: 2,
    },
  ],
  proveedor: [
    {
      // 1
      nombre: "María",
      direccion: "Avenida Revolución #456",
      telefono: "3312345678",
      horarioDeApertura: "08:30",
      horarioDeCierre: "17:30",
      productosQueSeCompran: "Manzanas",
      entregasADomicilio: "Sí",
      rfc: "MARG890715DFA",
    },
    {
      // 2
      nombre: "Juan",
      direccion: "Calle Juárez #123",
      telefono: "3333333333",
      horarioDeApertura: "09:00",
      horarioDeCierre: "18:00",
      productosQueSeCompran: "Plátanos",
      entregasADomicilio: "Sí",
      rfc: "JUAG790503GH",
    },
    {
      // 3
      nombre: "Laura",
      direccion: "Calle Reforma #789",
      telefono: "3356789012",
      horarioDeApertura: "11:00",
      horarioDeCierre: "20:00",
      productosQueSeCompran: "Uvas",
      entregasADomicilio: "No",
      rfc: "LAUG870415JKL",
    },
    {
      // 4
      nombre: "Pedro",
      direccion: "Avenida Vallarta #456",
      telefono: "3378901234",
      horarioDeApertura: "07:30",
      horarioDeCierre: "16:30",
      productosQueSeCompran: "Papayas",
      entregasADomicilio: "Sí",
      rfc: "PEDM880512QWE",
    },
    {
      // 5
      nombre: "María",
      direccion: "Calle Independencia #123",
      telefono: "3345678901",
      horarioDeApertura: "09:00",
      horarioDeCierre: "18:00",
      productosQueSeCompran: "Plátanos",
      entregasADomicilio: "Sí",
      rfc: "MAAM901205RTY",
    },
    {
      // 6
      nombre: "Juan",
      direccion: "Avenida Juárez #789",
      telefono: "3367890123",
      horarioDeApertura: "08:30",
      horarioDeCierre: "17:30",
      productosQueSeCompran: "Manzanas",
      entregasADomicilio: "No",
      rfc: "JUAG880721QAZ",
    },
    {
      // 7
      nombre: "Laura",
      direccion: "Calle Reforma #456",
      telefono: "3356789012",
      horarioDeApertura: "08:00",
      horarioDeCierre: "16:30",
      productosQueSeCompran: "Huevos",
      entregasADomicilio: "Sí",
      rfc: "LAUG890527JKL",
    },
    {
      // 8
      nombre: "Pedro",
      direccion: "Avenida Hidalgo #789",
      telefono: "3378901234",
      horarioDeApertura: "07:30",
      horarioDeCierre: "18:00",
      productosQueSeCompran: "Carne",
      entregasADomicilio: "No",
      rfc: "PEDP940315RTY",
    },
    {
      // 9
      nombre: "María",
      direccion: "Calle Juárez #1234",
      telefono: "3367890123",
      horarioDeApertura: "09:00",
      horarioDeCierre: "20:00",
      productosQueSeCompran: "Verduras",
      entregasADomicilio: "Sí",
      rfc: "MARG891205UIO",
    },
    {
      // 10
      nombre: "Juan",
      direccion: "Boulevard López Mateos #567",
      telefono: "3345678901",
      horarioDeApertura: "10:30",
      horarioDeCierre: "18:30",
      productosQueSeCompran: "Pan",
      entregasADomicilio: "Sí",
      rfc: "JUAN880915KLO",
    },
  ],
  reporteDeCompra: [
    {
      // 1
      fechaDeCompra: "2022-09-28",
      nombreProveedor: "María",
      credito: "No",
      factura: "No",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Lechuga",
          unidades: "Gramos",
          tempetatura: "Ambiente",
          caducidad: "2022-09-30",
          cantidad: 5,
          precioPorUnidad: 5,
          precioTotalDelProducto: 25,
        },
        {
          uuid: 2,
          materiaPrima: "Pepino",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2022-09-30",
          cantidad: 3,
          precioPorUnidad: 8,
          precioTotalDelProducto: 24,
        },
      ],
      precioTotalDelCompra: 49,
    },
    {
      // 2
      fechaDeCompra: "2022-11-10",
      nombreProveedor: "Juan",
      credito: "Sí",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Carne de res",
          unidades: "Kilogramos",
          tempetatura: "Refrigerado",
          caducidad: "2022-11-12",
          cantidad: 2,
          precioPorUnidad: 50,
          precioTotalDelProducto: 100,
        },
        {
          uuid: 2,
          materiaPrima: "Pescado",
          unidades: "Kilogramos",
          tempetatura: "Congelado",
          caducidad: "2022-11-15",
          cantidad: 3,
          precioPorUnidad: 30,
          precioTotalDelProducto: 90,
        },
      ],
      precioTotalDelCompra: 190,
    },
    {
      // 3
      fechaDeCompra: "2023-02-12",
      nombreProveedor: "Pedro",
      credito: "No",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Arroz",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-03-30",
          cantidad: 10,
          precioPorUnidad: 5,
          precioTotalDelProducto: 50,
        },
        {
          uuid: 2,
          materiaPrima: "Frijoles",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-30",
          cantidad: 5,
          precioPorUnidad: 8,
          precioTotalDelProducto: 40,
        },
      ],
      precioTotalDelCompra: 90,
    },
    {
      // 4
      fechaDeCompra: "2023-03-20",
      nombreProveedor: "Ana",
      credito: "Sí",
      factura: "No",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Queso",
          unidades: "Kilogramos",
          tempetatura: "Refrigerado",
          caducidad: "2023-03-31",
          cantidad: 2,
          precioPorUnidad: 30,
          precioTotalDelProducto: 60,
        },
        {
          uuid: 2,
          materiaPrima: "Huevo",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-15",
          cantidad: 12,
          precioPorUnidad: 1,
          precioTotalDelProducto: 12,
        },
      ],
      precioTotalDelCompra: 72,
    },
    {
      // 5
      fechaDeCompra: "2023-04-01",
      nombreProveedor: "María",
      credito: "Sí",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Lechuga",
          unidades: "Gramos",
          tempetatura: "Refrigerado",
          caducidad: "2023-04-03",
          cantidad: 6,
          precioPorUnidad: 2,
          precioTotalDelProducto: 12,
        },
        {
          uuid: 2,
          materiaPrima: "Zanahoria",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-10",
          cantidad: 3,
          precioPorUnidad: 3,
          precioTotalDelProducto: 9,
        },
      ],
      precioTotalDelCompra: 21,
    },
    {
      // 6
      fechaDeCompra: "2023-03-25",
      nombreProveedor: "Juan",
      credito: "No",
      factura: "No",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Pollo",
          unidades: "Kilogramos",
          tempetatura: "Congelado",
          caducidad: "2023-04-02",
          cantidad: 5,
          precioPorUnidad: 8,
          precioTotalDelProducto: 40,
        },
        {
          uuid: 2,
          materiaPrima: "Papa",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-20",
          cantidad: 2,
          precioPorUnidad: 2,
          precioTotalDelProducto: 4,
        },
      ],
      precioTotalDelCompra: 44,
    },
    {
      // 7
      fechaDeCompra: "2023-04-02",
      nombreProveedor: "Pedro",
      credito: "Sí",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Tomate",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-04",
          cantidad: 3,
          precioPorUnidad: 5,
          precioTotalDelProducto: 15,
        },
        {
          uuid: 2,
          materiaPrima: "Cebolla",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-15",
          cantidad: 2,
          precioPorUnidad: 3,
          precioTotalDelProducto: 6,
        },
      ],
      precioTotalDelCompra: 21,
    },
    {
      // 8
      fechaDeCompra: "2023-03-31",
      nombreProveedor: "Ana",
      credito: "No",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Queso",
          unidades: "Kilogramos",
          tempetatura: "Refrigerado",
          caducidad: "2023-04-05",
          cantidad: 2,
          precioPorUnidad: 7,
          precioTotalDelProducto: 14,
        },
        {
          uuid: 2,
          materiaPrima: "Huevo",
          unidades: "Gramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-10",
          cantidad: 1,
          precioPorUnidad: 12,
          precioTotalDelProducto: 12,
        },
      ],
      precioTotalDelCompra: 26,
    },
    {
      // 9
      fechaDeCompra: "2023-04-01",
      nombreProveedor: "María",
      credito: "No",
      factura: "No",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Lechuga",
          unidades: "Gramos",
          tempetatura: "Refrigerado",
          caducidad: "2023-04-03",
          cantidad: 5,
          precioPorUnidad: 2,
          precioTotalDelProducto: 10,
        },
        {
          uuid: 2,
          materiaPrima: "Zanahoria",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-07",
          cantidad: 3,
          precioPorUnidad: 4,
          precioTotalDelProducto: 12,
        },
      ],
      precioTotalDelCompra: 22,
    },
    {
      // 10
      fechaDeCompra: "2023-03-30",
      nombreProveedor: "Juan",
      credito: "Sí",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Pollo",
          unidades: "Kilogramos",
          tempetatura: "Congelado",
          caducidad: "2023-04-05",
          cantidad: 2,
          precioPorUnidad: 8,
          precioTotalDelProducto: 16,
        },
        {
          uuid: 2,
          materiaPrima: "Pescado",
          unidades: "Kilogramos",
          tempetatura: "Refrigerado",
          caducidad: "2023-04-10",
          cantidad: 1,
          precioPorUnidad: 15,
          precioTotalDelProducto: 15,
        },
      ],
      precioTotalDelCompra: 31,
    },
  ],
  asignarPrecio: [
    {
      // 1
      producto: "Harina",
      precioMaximo: "50",
    },
    {
      // 2
      producto: "Arroz",
      precioMaximo: "30",
    },
    {
      // 3
      producto: "Leche",
      precioMaximo: "25",
    },
    {
      // 4
      producto: "Aceite de oliva",
      precioMaximo: "120",
    },

    {
      // 5
      producto: "Salchichas",
      precioMaximo: "60",
    },
    {
      // 6
      producto: "Café",
      precioMaximo: "80",
    },
    {
      // 7
      producto: "Azúcar",
      precioMaximo: "40",
    },
    {
      // 8
      producto: "Pasta de dientes",
      precioMaximo: "15",
    },
    {
      // 9
      producto: "Jabón de baño",
      precioMaximo: "10",
    },
    {
      // 10
      producto: "Papel higiénico",
      precioMaximo: "20",
    },
  ],
  clienteFrecuente: [
    {
      // 1
      nombre: "María",
      correoElectronico: "maria@hotmail.com",
      fechaDeNacimiento: "1995-07-15",
      puntosDeCompra: 50,
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Norte",
    },
    {
      // 2
      nombre: "Juan",
      correoElectronico: "juan@yahoo.com",
      fechaDeNacimiento: "1980-05-10",
      puntosDeCompra: 25,
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Este",
    },
    {
      // 3
      nombre: "Pedro",
      correoElectronico: "pedro@gmail.com",
      fechaDeNacimiento: "1978-02-28",
      puntosDeCompra: 100,
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Oeste",
    },
    {
      // 4
      nombre: "Luisa",
      correoElectronico: "luisa@hotmail.com",
      fechaDeNacimiento: "2000-09-12",
      puntosDeCompra: 75,
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Sur",
    },
    {
      // 5
      nombre: "Ana",
      correoElectronico: "ana@gmail.com",
      fechaDeNacimiento: "1992-03-20",
      puntosDeCompra: 40,
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Noreste",
    },
    {
      // 6
      nombre: "Carlos",
      correoElectronico: "carlos@yahoo.com",
      fechaDeNacimiento: "1985-11-05",
      puntosDeCompra: 20,
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Sureste",
    },
    {
      // 7
      nombre: "Laura",
      correoElectronico: "laura@hotmail.com",
      fechaDeNacimiento: "1998-06-30",
      puntosDeCompra: 60,
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Noroeste",
    },
    {
      // 8
      nombre: "Jorge",
      correoElectronico: "jorge@gmail.com",
      fechaDeNacimiento: "1974-12-18",
      puntosDeCompra: 30,
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Centro-Sur",
    },
    {
      // 9
      nombre: "Isabel",
      correoElectronico: "isabel@yahoo.com",
      fechaDeNacimiento: "1988-08-08",
      puntosDeCompra: 70,
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Centro-Norte",
    },
    {
      // 10
      nombre: "Ricardo",
      correoElectronico: "ricardo@gmail.com",
      fechaDeNacimiento: "1991-04-25",
      puntosDeCompra: 15,
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Centro-Este",
    },
  ],
};
