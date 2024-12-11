import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import img from '../assets/logoblanco.png';
function PdfModifier() {
  const [establishment, setEstablishment] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [visual, setVisual] = useState('');
  const navigate = useNavigate();  // Hook de navegación

  const modifyAndDownloadPdf = async () => {
    try {
      // Cargar el archivo PDF original
      const existingPdfBytes = await fetch('/CERTIFICADO_DE_RECOLECCION_HOTEL_TATIVAN_AGOSTO2024.pdf').then(res => res.arrayBuffer());

      // Crear un documento PDF basado en el original
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Obtener la primera página del documento PDF
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Agregar texto en las áreas específicas
      // Cambiar Establecimiento
      firstPage.drawText(establishment, { x: 85, y: 562, size: 12, color: rgb(0, 0, 0) });

      // Cambiar Número de Identificación Tributaria
      firstPage.drawText(idNumber, { x: 400, y: 565, size: 12, color: rgb(0, 0, 0) });

      // Cambiar Fecha
      firstPage.drawText(date, { x: 217, y: 548, size: 12, color: rgb(0, 0, 0) });

      // Cambiar Cantidad de Residuos
      firstPage.drawText(quantity, { x: 300, y: 455, size: 12, color: rgb(0, 0, 0) });

      // Fecha de generacion
      firstPage.drawText(visual, { x: 210, y: 708, size: 12, color: rgb(0, 0, 0) });

      // Guardar el PDF modificado
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Descargar el archivo modificado
      saveAs(blob, 'certificado_modificado.pdf');
    } catch (error) {
      console.error('Error al modificar y descargar el PDF:', error);
    }
  };

  // Función para navegar al componente Principal
  const goToClientes = () => {
    navigate('/clientes');
  };
  const goToTabla = () => {
    navigate('/tabla');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <nav className="bg-[#479C21] shadow-md fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img className="w-48" src={img} alt="" />

          <div className="flex space-x-4">
            <button
              className="bg-[#F7E828] text-black px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => navigate('/tabla')}
            >
              Tablatura
            </button>
            <button
              className="bg-[#F7E828] text-black px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => navigate('/clientes')}
            >
              Clientes
            </button>
          </div>
        </div>
      </nav>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Modificar y Descargar PDF</h2>
      <div className="mb-4 w-full max-w-md">
        <label className="block text-gray-700 mb-2">Establecimiento:</label>
        <input
          type="text"
          value={establishment}
          onChange={(e) => setEstablishment(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 w-full max-w-md">
        <label className="block text-gray-700 mb-2">Número de Identificación:</label>
        <input
          type="text"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 w-full max-w-md">
        <label className="block text-gray-700 mb-2">Cantidad de Residuos:</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 w-full max-w-md">
        <label className="block text-gray-700 mb-2">Fecha:</label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 w-full max-w-md">
        <label className="block text-gray-700 mb-2">Fecha de Generación:</label>
        <input
          type="text"
          value={visual} // Aquí debe ser `visual`, no `date`
          onChange={(e) => setVisual(e.target.value)} // Actualiza correctamente `setVisual`
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Botón para modificar el PDF y redirigir a Principal */}
      <button
        onClick={() => {
          modifyAndDownloadPdf();
          goToPrincipal(); // Navega a la página Principal
        }}
        className="bg-[#479C21] text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Descargar PDF Modificado y Ir a Principal
      </button>
    </div>
  );
}

export default PdfModifier;
