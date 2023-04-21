import jsPDF from "jspdf";
import React from "react";

const PruebasPdf = () => {
  const tiempoActual = Date.now();
  const hoy = new Date(tiempoActual);
  const anio = hoy.getFullYear();
  const mes = hoy.getMonth() + 1;
  const dia = hoy.getDate();

  // const hours = hoy.getHours() < 10 ? `0${hoy.getHours()}` : hoy.getHours();
  // const minutes = hoy.getMinutes() < 10 ? `0${hoy.getMinutes()}` : hoy.getMinutes();
  // const seconds = hoy.getSeconds() < 10 ? `0${hoy.getSeconds()}` : hoy.getSeconds();
  // const milliseconds = hoy.getMilliseconds();

  const timeString = hoy.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const lineHeight = 15;
  const numItems = 1;
  let ticketHeight = 0;

  if (numItems >= 1) {
    ticketHeight = numItems * 15 + 155;
  }

  const doc = new jsPDF({
    unit: "mm",
    format: [ticketHeight, 70],
    putOnlyUsedFonts: true,
  });

  doc.setLineHeightFactor(1.2);
  doc.setFontSize(10);

  doc.addImage(
    "/static/Imagen-ticket.png",
    "PNG",
    5,
    5,
    60,
    60
  );

  // doc.setFont("helvetica", "bold");
  // doc.text("LA CASA DEL PASTE", 17, 55);
  // doc.text("TRADACIONAL HIDALGUENSE", 8, 60);

  doc.setFont("helvetica", "normal");
  doc.text("Av. Conchita #3180", 19, 70);
  doc.text("Col. Loma Bonita C.P.45086", 12, 75);
  doc.text("Zapopan,Jal.", 24, 80);

  doc.text("Cel: 33 2967 6329", 20, 90);
  doc.text("Tel: 33 9688 9088", 20, 95);

  doc.line(3, 100, 67, 100);

  let y = 110;

  for (let i = 1; i <= numItems; i++) {
    const itemText = `${i} x Frutos rojos con philadelphia`;
    const itemPrice = "$9,999.99";

    doc.text(itemText, 5, y);
    doc.text(itemPrice, 48, y + 5);

    y += lineHeight;
  }

  doc.line(3, y - 2, 67, y - 2);

  doc.setFont("helvetica", "bold");
  doc.text("TOTAL: ", 5, y + lineHeight - 10);
  doc.text("$9,999", 54, y + lineHeight - 10);

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

  return <div>PruebasPdf</div>;
};

export default PruebasPdf;
