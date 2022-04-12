const fs = require('fs');
const PDFkit = require('pdfkit');

exports.createInvoiceReport = (res, path, products, order, totalPrice) => {  
  const PDFdocument = new PDFkit();

  PDFdocument.pipe(fs.createWriteStream(path));
  PDFdocument.pipe(res);
  
  PDFdocument.text(`Order number: ${order.id}`);
  PDFdocument.text(`===================`);
  products.forEach((product, index) => {
    PDFdocument.text(`Product number ${index+1} Details: `);
    PDFdocument.text(`Title: ${product.title}`);
    PDFdocument.text(`Price: ${product.price}`);
    PDFdocument.text(`Quantity: ${product.orderItem.quantity}`);
    PDFdocument.text(`-------------`);      
  });
  PDFdocument.text(`===================`);
  PDFdocument.text(`Total price: ${totalPrice}`);
    
  PDFdocument.end();
}