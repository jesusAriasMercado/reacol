import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import img from '../assets/logoblanco.png';
const EditableCustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  // Función para ir a la página principal
  const goToPrincipal = () => {
    navigate('/principal');  // Redirige a la ruta del componente Plantilla
  };

  // Cargar datos desde Firebase al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "customers"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Incluimos el ID del documento
          ...doc.data(),
        }));
        setCustomers(data); // Poblar el estado con los datos de Firebase
      } catch (error) {
        console.error("Error al cargar datos desde Firebase:", error);
      }
    };

    fetchData();
  }, []);

  // Manejar cambios en las celdas
  const handleInputChange = async (e, index, field) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index][field] = e.target.value;

    setCustomers(updatedCustomers);

    // Actualizar el dato en Firebase
    try {
      const customer = updatedCustomers[index];
      if (customer.id) {
        // Si el documento ya existe, lo actualizamos
        const docRef = doc(db, "customers", customer.id);
        await updateDoc(docRef, { [field]: e.target.value });
      }
    } catch (error) {
      console.error("Error al actualizar el dato en Firebase:", error);
    }
  };

  // Agregar una nueva fila vacía y enviarla a Firebase
  const addRow = async () => {
    try {
      const newCustomer = {
        fecha: "",
        tipo: "",
        contacto: "",
        direccion: "",
        cantidad: "",
        costo: "",
      };
      const docRef = await addDoc(collection(db, "customers"), newCustomer);
      setCustomers([...customers, { id: docRef.id, ...newCustomer }]);
    } catch (error) {
      console.error("Error al agregar una nueva fila a Firebase:", error);
    }
  };
  const goToClientes = () => {
    navigate('/plantilla');
  };
  const goToTabla = () => {
    navigate('/tabla'); 
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
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
              onClick={() => navigate('/platilla')}
            >
              Certificado
            </button>
          </div>
        </div>
      </nav>

      <h2 className="text-2xl font-bold mb-4 text-center">Gestión de Clientes</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 border border-gray-300">
          <thead className="bg-green-600 text-white text-lg">
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Tipo de cliente</th>
              <th className="px-4 py-2">Contacto</th>
              <th className="px-4 py-2">Dirección</th>
              <th className="px-4 py-2">Cantidad de KG al mes</th>
              <th className="px-4 py-2">Costo de transporte x KG</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={customer.id || index} // Usar el ID de Firebase si está disponible
                className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="px-4 py-2">
                  <input
                    type="date"
                    value={customer.fecha}
                    onChange={(e) => handleInputChange(e, index, "fecha")}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    placeholder="Tipo de cliente"
                    value={customer.tipo}
                    onChange={(e) => handleInputChange(e, index, "tipo")}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    placeholder="Contacto"
                    value={customer.contacto}
                    onChange={(e) => handleInputChange(e, index, "contacto")}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={customer.direccion}
                    onChange={(e) => handleInputChange(e, index, "direccion")}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    placeholder="Cantidad (KG)"
                    value={customer.cantidad}
                    onChange={(e) => handleInputChange(e, index, "cantidad")}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    placeholder="Costo x KG"
                    value={customer.costo}
                    onChange={(e) => handleInputChange(e, index, "costo")}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addRow}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Agregar Fila
        </button>
      </div>
    </div>
  );
};

export default EditableCustomerManagement;
