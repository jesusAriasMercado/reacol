import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../assets/logoblanco.png';

function Principal() {
    const navigate = useNavigate();

    const goToPlantilla = () => {
        navigate('/plantilla');  // Redirige a la ruta del componente Plantilla
    };

    const goToTablePage = () => {
        navigate('/tabla');  // Redirige a la página de la tabla
    };

    const goToClientes = () => {
        navigate ('/clientes');
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-[#479C21] shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <img className="w-48" src={img} alt="Logo" />
                </div>
            </nav>

            {/* Hero Section */}
            <section className=" py-20 pt-44">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl text-[#479C21] font-bold mb-4">Bienvenido a nuestro sitio web</h1>
                    <p className="text-lg text-[#479C21] mb-8">Este software ayudará al manejo y orden de la empresa</p>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <button
                        onClick={goToTablePage} // Redirige a la página de la tabla
                        className="bg-[#479C21] p-6 rounded-lg shadow-md text-center  focus:outline-none focus:ring-2"
                    >
                        <h1 className="text-xl font-semibold text-white mb-2">Tabulacion</h1>
                    </button>

                    <button
                        onClick={goToPlantilla} // Redirige a la página de Plantilla
                        className="bg-[#479C21] p-6 rounded-lg shadow-md text-center  focus:outline-none focus:ring-2"
                    >
                        <h3 className="text-xl font-semibold text-white mb-2">Certificado</h3>
                    </button>

                    <button
                        onClick={goToClientes}
                        className="bg-[#479C21] p-6 rounded-lg shadow-md text-center focus:outline-none focus:ring-2"
                        >
                        <h3 className="text-xl font-semibold text-white mb-2">Gestion de clientes</h3>
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Principal;
