// src/components/Signin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from "../firebase/firebaseConfig"; // Asegúrate de que esta importación sea correcta

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth(app); // Usamos la instancia de Firebase

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado:", userCredential.user);
      setError(null);
      navigate('/home'); // Redirige al componente principal después del registro exitoso
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Crea la cuenta</h2>
          <span className="text-gray-500">¿Ya tienes una cuenta? 
            <a href="/login" className="text-[#479C21] hover:underline"> Inicia sesión</a>
          </span>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="flex space-x-4">
            <input type="text" placeholder="Nombre" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" placeholder="Apellido" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex space-x-4">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Confirma la contraseña" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={showPassword} 
              onChange={() => setShowPassword(!showPassword)} 
              className="rounded"
            />
            <label className="text-gray-600">Mostrar contraseña</label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#479C21] text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
          >
            Crea una cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
