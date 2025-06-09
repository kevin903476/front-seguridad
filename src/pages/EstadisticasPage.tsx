import { useState } from 'react';
import GraficoBarrasAccesos from '../components/GraficoBarrasAccesos';

const EstadisticasPage = () => {
  const [fecha, setFecha] = useState('');

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFecha(e.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Estadísticas de Accesos</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Filtrar por fecha:</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={fecha}
            onChange={handleFechaChange}
            className="border p-2 rounded"
            max={new Date().toISOString().split('T')[0]} // No permitir fechas futuras
          />
        </div>
      </div>

      <GraficoBarrasAccesos fecha={fecha || undefined} />
    </div>
  );
};

export default EstadisticasPage;