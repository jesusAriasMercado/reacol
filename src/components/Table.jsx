import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import img from '../assets/logoblanco.png';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const EditableTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tableCollectionRef = collection(db, "tablas");

  const navigate = useNavigate();

  const goToClientes = () => {
    navigate("/clientes");
  };

  const goToPlantilla = () => {
    navigate("/plantilla");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(tableCollectionRef);
        console.log("Consulta realizada, documentos:", querySnapshot.docs); // Esto mostrará los documentos en la consola
        const loadedData = querySnapshot.docs.map((doc) => ({
          id: `firebase_${doc.id}`,
          ...doc.data(),
        }));
        console.log("Datos cargados:", loadedData); // Verifica los datos cargados
        setData(loadedData);
        setIsLoading(false); // Cambia el estado de carga a false
      } catch (error) {
        console.error("Error al cargar datos desde Firebase:", error);
        alert("Hubo un error al cargar los datos");
      }
    };
    fetchData();
  }, []);
  
  

  const handleInputChange = (e, id, field) => {
    const { value } = e.target;
    setData((prevData) =>
      prevData.map((row) => {
        if (row.id === id) {
          const updatedRow = { ...row, [field]: value };
          if (field === "cantidadKg" || field === "costoUnitario") {
            updatedRow.totalCosto = updatedRow.cantidadKg * updatedRow.costoUnitario;
          }
          if (field === "cantidadKg" || field === "valorVentaUnidad") {
            updatedRow.valorVentaTotal = updatedRow.cantidadKg * updatedRow.valorVentaUnidad;
          }
          updatedRow.gananciaTotal = updatedRow.valorVentaTotal - updatedRow.totalCosto;
          return updatedRow;
        }
        return row;
      })
    );
  };
  

  const addRow = () => {
    const newRow = {
      id: Date.now().toString(),
      fecha: "",
      transpSergio: "",
      pagador: "",
      cantidadKg: 0,
      cliente: "",
      costoUnitario: 0,
      totalCosto: 0,
      valorVentaUnidad: 0,
      valorVentaTotal: 0,
      gananciaTotal: 0,
    };
    setData([...data, newRow]);
  };

  const saveToFirebase = async () => {
    try {
      const newRows = data.filter((row) => !row.id.startsWith("firebase_"));
      if (newRows.length === 0) {
        alert("No hay datos nuevos para guardar.");
        return;
      }
  
      // Validar datos
      const validRows = newRows.filter((row) => {
        return row.fecha && row.cantidadKg && row.costoUnitario && row.valorVentaUnidad;
      });
  
      if (validRows.length === 0) {
        alert("Algunas filas tienen datos incompletos. Por favor, verifica antes de guardar.");
        return;
      }
  
      const batchPromises = validRows.map(async (row) => {
        const { id, ...rowData } = row;
        const docRef = await addDoc(tableCollectionRef, rowData);
        row.id = `firebase_${docRef.id}`;
      });
      await Promise.all(batchPromises);
      setData((prevData) =>
        prevData.map((row) =>
          row.id.startsWith("firebase_") ? row : { ...row, id: `firebase_${row.id}` }
        )
      );
      alert("Datos guardados en Firebase con éxito.");
    } catch (error) {
      console.error("Error al guardar los datos en Firebase:", error);
      alert("Hubo un error al guardar los datos.");
    }
  };
  

  const processChartData = () => {
    const groupedData = {};
    data.forEach((row) => {
      const date = new Date(row.fecha);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!groupedData[month]) {
        groupedData[month] = {
          month,
          totalCosto: 0,
          valorVentaTotal: 0,
          gananciaTotal: 0,
        };
      }
      groupedData[month].totalCosto += parseFloat(row.totalCosto) || 0;
      groupedData[month].valorVentaTotal += parseFloat(row.valorVentaTotal) || 0;
      groupedData[month].gananciaTotal += parseFloat(row.gananciaTotal) || 0;
    });
    return Object.values(groupedData);
  };

  const generateSummary = () => {
    const monthlyData = processChartData();
    const annualSummary = monthlyData.reduce(
      (acc, month) => {
        acc.totalCosto += month.totalCosto;
        acc.valorVentaTotal += month.valorVentaTotal;
        acc.gananciaTotal += month.gananciaTotal;
        return acc;
      },
      { totalCosto: 0, valorVentaTotal: 0, gananciaTotal: 0 }
    );
    return { monthlyData, annualSummary };
  };

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  const { monthlyData, annualSummary } = generateSummary();
  return (
    <div className="container mx-auto p-4">
      <nav className="bg-[#479C21] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img className="w-48" src={img} alt="" />

          <div className="flex space-x-4">
            <button
              className="bg-[#F7E828] text-black px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => navigate('/plantilla')} // Redirige a /login
            >
              Certificado 
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
      <h1 className="text-2xl font-bold mb-4">Tabla Editable con Gráficas</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Transp Sergio</th>
              <th className="py-2 px-4 border-b">Pagador</th>
              <th className="py-2 px-4 border-b">Cantidad en Kg</th>
              <th className="py-2 px-4 border-b">Cliente</th>
              <th className="py-2 px-4 border-b">Costo Unit</th>
              <th className="py-2 px-4 border-b">Total Costo</th>
              <th className="py-2 px-4 border-b">Valor Venta x Und</th>
              <th className="py-2 px-4 border-b">Valor Venta Total</th>
              <th className="py-2 px-4 border-b">Ganancia Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="py-2 px-4 border-b">
                  <input
                    type="date"
                    value={row.fecha}
                    onChange={(e) => handleInputChange(e, row.id, "fecha")}
                    className="border px-2 py-1 w-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="text"
                    value={row.transpSergio}
                    onChange={(e) => handleInputChange(e, row.id, "transpSergio")}
                    className="border px-2 py-1 w-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="text"
                    value={row.pagador}
                    onChange={(e) => handleInputChange(e, row.id, "pagador")}
                    className="border px-2 py-1 w-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="number"
                    value={row.cantidadKg}
                    onChange={(e) => handleInputChange(e, row.id, "cantidadKg")}
                    className="border px-2 py-1 w-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="text"
                    value={row.cliente}
                    onChange={(e) => handleInputChange(e, row.id, "cliente")}
                    className="border px-2 py-1 w-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="number"
                    value={row.costoUnitario}
                    onChange={(e) => handleInputChange(e, row.id, "costoUnitario")}
                    className="border px-2 py-1 w-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="number"
                    value={row.totalCosto}
                    readOnly
                    className="border px-2 py-1 w-full bg-gray-100"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="number"
                    value={row.valorVentaUnidad}
                    onChange={(e) => handleInputChange(e, row.id, "valorVentaUnidad")}
                    className="border px-2 py-1 w-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="number"
                    value={row.valorVentaTotal}
                    readOnly
                    className="border px-2 py-1 w-full bg-gray-100"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="number"
                    value={row.gananciaTotal}
                    readOnly
                    className="border px-2 py-1 w-full bg-gray-100"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addRow}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Añadir Fila
      </button>
      <button
        onClick={saveToFirebase}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-2"
      >
        Guardar
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">principal</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalCosto" fill="#8884d8" name="Costo Total" />
            <Bar dataKey="valorVentaTotal" fill="#82ca9d" name="Valor Venta Total" />
            <Bar dataKey="gananciaTotal" fill="#ffc658" name="Ganancia Total" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Resumen Anual</h2>
        <p>Costo Total: {annualSummary.totalCosto.toFixed(2)}</p>
        <p>Valor Venta Total: {annualSummary.valorVentaTotal.toFixed(2)}</p>
        <p>Ganancia Total: {annualSummary.gananciaTotal.toFixed(2)}</p>
      </div>

    </div>
  );
};

export default EditableTable;
