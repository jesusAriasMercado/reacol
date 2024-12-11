
import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../assets/logoblanco.png';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-[#479C21] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img className="w-48" src={img} alt="" />

          <div className="flex space-x-4">
            <button
              className="bg-[#F7E828] text-black px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => navigate('/login')} // Redirige a /login
            >
              Inicio
            </button>
            <button
              className="bg-[#F7E828] text-black px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => navigate('/signin')}
            >
              Registro
            </button>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section className=" text-white py-20 pt-44">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl text-[#479C21] font-bold mb-4">Bienvenido a nuestro sitio web</h1>
          <p className="text-lg text-[#479C21] mb-8">Este software ayudará al manejo y orden de la empresa</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#479C21] p-6 rounded-lg shadow-md text-center">
            <h1 className="text-xl font-semibold text-white mb-2">Tabulacion</h1>
          </div>
          <div className="bg-[#479C21] p-6 rounded-lg shadow-md text-center">
            <h1 className="text-xl font-semibold text-white mb-2">Certificado</h1>
          </div>
          <div className="bg-[#479C21] p-6 rounded-lg shadow-md text-center">
            <h1 className="text-xl font-semibold text-white mb-2">Gestion de clientes</h1>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
