import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from "../firebase/firebaseConfig";  // Asegúrate de que la configuración de Firebase esté exportada

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);  // Estado para errores de autenticación
  const navigate = useNavigate();
  const auth = getAuth(app);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      navigate('/principal');  // Redirige al componente Principal después de iniciar sesión
    } catch (err) {
      setError('Credenciales incorrectas. Intenta de nuevo.');
      console.log(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}  {/* Mostrar error si ocurre */}

          <button
            type="submit"
            className="w-full bg-[#479C21] text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          ¿No tienes una cuenta? <a href="/signup" className="text-blue-500 hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
