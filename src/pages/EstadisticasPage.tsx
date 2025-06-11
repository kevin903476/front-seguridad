import { useState } from 'react';
import GraficoBarrasAccesos from '../components/GraficoBarrasAccesos';
import { button } from 'framer-motion/client';

const EstadisticasPage = () => {
  const [fecha, setFecha] = useState('');

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Estadísticas de Accesos</h1>
        
        <div className="mb-6">
          <label className="block text-blue-800 font-medium mb-2"> {/* Cambiado a azul oscuro */}
            Filtrar por fecha:
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="border border-blue-200 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-800" /* Texto azul oscuro */
            />
            {fecha && (
      <button
  onClick={() => setFecha('')}
  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2 px-4 rounded shadow-md transition-colors duration-200"
>
  Limpiar
</button>
            )}
          </div>
        </div>

        <div className="border-t border-blue-100 pt-4">
          <GraficoBarrasAccesos fecha={fecha || undefined} />
        </div>
      </div>
    </div>
  );
};

export default EstadisticasPage;