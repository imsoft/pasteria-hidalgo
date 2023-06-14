import jsPDF from "jspdf";
import { ListadoDeProductos } from "../interfaces";

export const generateTicket = (
  listaProductos: ListadoDeProductos[],
  cantidadProductos: number,
  totalVenta: number
) => {
  const lineHeight = 15;
  let ticketHeight = 0;

  const tiempoActual = Date.now();
  const hoy = new Date(tiempoActual);
  const anio = hoy.getFullYear();
  const mes = hoy.getMonth() + 1;
  const dia = hoy.getDate();

  const timeString = hoy.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  if (cantidadProductos >= 1) {
    ticketHeight = cantidadProductos * 15 + 155;
  }

  const doc = new jsPDF({
    unit: "mm",
    format: [ticketHeight, 70],
    putOnlyUsedFonts: true,
  });

  doc.setLineHeightFactor(1.2);
  doc.setFontSize(10);

  doc.addImage(
    "/static/Imagen-ticket.jpg",
    "JPEG",
    5,
    5,
    60,
    60
  );

  doc.setFont("helvetica", "normal");
  doc.text("Av. Conchita #3180", 19, 70);
  doc.text("Col. Loma Bonita C.P.45086", 12, 75);
  doc.text("Zapopan,Jal.", 24, 80);

  doc.text("Cel: 33 2967 6329", 20, 90);
  doc.text("Tel: 33 9688 9088", 20, 95);

  doc.line(3, 100, 67, 100);

  let y = 110;

  listaProductos.map(({ cantidad, saborProducto, precioProducto }) => {
    const itemText = `${cantidad} x ${saborProducto}`;
    const itemPrice = `$ ${precioProducto}`;

    doc.text(itemText, 5, y);
    doc.text(itemPrice, 48, y + 5);

    y += lineHeight;
  });

  doc.line(3, y - 2, 67, y - 2);

  doc.setFont("helvetica", "bold");
  doc.text("TOTAL: ", 5, y + lineHeight - 10);
  doc.text(`$ ${totalVenta}`, 54, y + lineHeight - 10);

  doc.line(3, y + lineHeight - 5, 67, y + lineHeight - 5);

  doc.setFont("helvetica", "normal");
  doc.text("¡Gracias por tu compra!", 16, y + lineHeight * 2 - 10);
  doc.text("Vuelve pronto", 24, y + lineHeight * 2 - 5);

  doc.text(
    `${dia < 10 ? "0" + dia : dia}/${
      mes < 10 ? "0" + mes : mes
    }/${anio}  ${timeString}`,
    17,
    y + lineHeight * 3 - 10
  );

  doc.save("Ticket de venta.pdf");
  doc.autoPrint();
};
